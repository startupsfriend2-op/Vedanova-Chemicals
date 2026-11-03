import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateEnquiry } from '@/lib/contact/validate';
import { enquirySubject, enquiryHtml, enquiryText, formatIst } from '@/lib/contact/email';
import { checkSubmission, releaseSubmission } from '@/lib/contact/ratelimit';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 15000;
const TOO_LONG = 'Your enquiry is too long. Please shorten it and try again.';
const GENERIC_FAILURE = 'Unable to submit your enquiry right now. Please try again.';

/** Client address from the proxy header. Only the first hop is used. */
function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  return forwarded.split(',')[0].trim().slice(0, 64) || 'unknown';
}

export async function POST(request: NextRequest) {
  if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: TOO_LONG }, { status: 413 });
  }

  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ error: TOO_LONG }, { status: 413 });
    const body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('not an object');
    data = body;
  } catch {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Report success so bots learn nothing.
  if (typeof data.website === 'string' && data.website.trim()) return NextResponse.json({ success: true });

  const result = validateEnquiry(data);
  if (!result.ok) return NextResponse.json({ error: result.message, field: result.field }, { status: 400 });
  const { enquiry } = result;

  // Fingerprint of the enquiry content, used to stop repeated or double submissions.
  // Configuration comes only from the environment. The recipient is never read from the request.
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL || process.env.CONTACT_TO_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || apiKey === 're_replace_me' || !recipient || !sender) {
    console.error('Contact endpoint is missing email configuration (RESEND_API_KEY, CONTACT_EMAIL, RESEND_FROM_EMAIL).');
    return NextResponse.json({ error: 'Online enquiries are not available right now. Please contact us by phone or email.' }, { status: 503 });
  }

  // Fingerprint of the enquiry content, used to stop repeated or double submissions.
  const fingerprint = Buffer.from(`${enquiry.email}|${enquiry.product}|${enquiry.message}`.toLowerCase()).toString('base64url').slice(0, 96);
  const verdict = await checkSubmission(clientIp(request), fingerprint);
  if (verdict === 'limited') {
    return NextResponse.json({ error: 'Too many enquiries were sent from your connection. Please wait a few minutes, or contact us by phone or email.' }, { status: 429 });
  }
  if (verdict === 'duplicate') {
    return NextResponse.json({ error: 'This enquiry was already received a moment ago. Please do not send it again.' }, { status: 409 });
  }

  const submittedAt = formatIst(new Date());
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: enquiry.email,
      subject: enquirySubject(enquiry.name),
      html: enquiryHtml(enquiry, submittedAt),
      text: enquiryText(enquiry, submittedAt),
    });
    if (error) {
      // Log the provider error name only. Never log the key, the payload or the raw response.
      console.error('Resend rejected the enquiry email', error.name);
      await releaseSubmission(fingerprint);
      return NextResponse.json({ error: GENERIC_FAILURE }, { status: 502 });
    }
    // Resend accepted the email for delivery. This does not prove the inbox received it.
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email service call failed', err instanceof Error ? err.name : 'unknown');
    await releaseSubmission(fingerprint);
    return NextResponse.json({ error: GENERIC_FAILURE }, { status: 502 });
  }
}
