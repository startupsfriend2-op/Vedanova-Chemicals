// Rate limiting and duplicate detection for the enquiry endpoint.
//
// Production (Vercel): set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. Counters are then shared by every
// serverless instance, so the limits hold.
// Without them, the limiter uses memory. That only protects a single instance and is NOT sufficient for production.

const WINDOW_SECONDS = 600;
const MAX_PER_IP = 5;
const DUPLICATE_SECONDS = 600;

type Store = {
  /** Increments a counter, sets its expiry on first use, and returns the new count. */
  incr(key: string): Promise<number>;
  /** Sets the key only if it does not exist. Returns true when it was newly set. */
  setIfNew(key: string, seconds: number): Promise<boolean>;
  /** Removes a key. Used when a send fails, so the customer can retry. */
  del(key: string): Promise<void>;
};

const memory = new Map<string, { count: number; expires: number }>();
const memoryStore: Store = {
  async incr(key) {
    const now = Date.now();
    const entry = memory.get(key);
    if (!entry || entry.expires < now) {
      memory.set(key, { count: 1, expires: now + WINDOW_SECONDS * 1000 });
      return 1;
    }
    entry.count += 1;
    return entry.count;
  },
  async setIfNew(key, seconds) {
    const now = Date.now();
    const entry = memory.get(key);
    if (entry && entry.expires > now) return false;
    memory.set(key, { count: 1, expires: now + seconds * 1000 });
    return true;
  },
  async del(key) {
    memory.delete(key);
  },
};

function upstashStore(url: string, token: string): Store {
  // One pipeline request per check keeps each submission to a single round trip.
  async function pipeline(commands: (string | number)[][]) {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(commands),
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`rate limit store responded ${res.status}`);
    return (await res.json()) as { result?: unknown }[];
  }
  return {
    async incr(key) {
      const [count] = await pipeline([
        ['INCR', key],
        ['EXPIRE', key, WINDOW_SECONDS, 'NX'],
      ]);
      return Number(count.result ?? 0);
    },
    async setIfNew(key, seconds) {
      const [res] = await pipeline([['SET', key, '1', 'NX', 'EX', seconds]]);
      return res.result === 'OK';
    },
    async del(key) {
      await pipeline([['DEL', key]]);
    },
  };
}

export const usingSharedStore = () => Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

function store(): Store {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? upstashStore(url, token) : memoryStore;
}

/** Forgets a duplicate marker after a failed send, so the same enquiry can be retried. Failures are ignored. */
export async function releaseSubmission(fingerprint: string): Promise<void> {
  try {
    await store().del(`enq:dup:${fingerprint}`);
  } catch (err) {
    console.error('Could not release duplicate marker', err instanceof Error ? err.name : 'unknown');
  }
}

/** 'ok', 'limited' (too many from this address) or 'duplicate' (same enquiry again). Fails open if the store is down. */
export async function checkSubmission(ip: string, fingerprint: string): Promise<'ok' | 'limited' | 'duplicate'> {
  try {
    const s = store();
    const ipCount = await s.incr(`enq:ip:${ip}`);
    if (ipCount > MAX_PER_IP) return 'limited';
    const isNew = await s.setIfNew(`enq:dup:${fingerprint}`, DUPLICATE_SECONDS);
    if (!isNew) return 'duplicate';
    return 'ok';
  } catch (err) {
    // A failing store must not block real customers. Only the error name is logged, never customer data.
    console.error('Rate limit check unavailable', err instanceof Error ? err.name : 'unknown');
    return 'ok';
  }
}
