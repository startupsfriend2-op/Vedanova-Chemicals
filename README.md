# Vedanova Chemicals — Corporate Website

A custom, responsive B2B informational website for **Vedanova Chemicals Private Limited**. Developed with Next.js (React) and the Node.js runtime, using the client-provided original brand logo.

## Pages

- `/` — Home: full-bleed hero, offerings with photography, company intro, application areas, process timeline, enquiry band (styles in `app/home.css`, sections in `components/home/`, motion in `components/motion/`). Home only: Lenis wheel smoothing (`SmoothScroll`), a cross-fading hero slideshow (`HeroSlider`) and, on screens 1024px and wider with motion allowed, the offerings as a pinned scroll-driven scene (`PinnedOfferings`); phones, tablets, reduced motion and no-JS get the plain card grid
- `/about` — Company overview and business approach
- `/products` — Industrial Solvents, Recovered Solvents, Petrochemicals
- `/industries` — Illustrative industrial application categories
- `/contact` — Contact details and working enquiry form
- `/privacy` — Draft privacy notice (requires company approval)

## Requirements

- Node.js 20.9+ (22 LTS recommended)
- npm
- Resend account and verified sender domain to send website enquiries by email

## Start locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Visit http://localhost:3000.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

Home photography is graded with `node scripts/grade-photos.cjs <rawDir>` (writes `public/images/photos` and `lib/photo-meta.json`).

## Make the enquiry form deliver messages

Enquiries are sent with the official Resend SDK from `app/api/contact/route.ts`. The recipient is read only from `CONTACT_EMAIL` on the server, never from the form.

1. Sign up at https://resend.com and create an API key.
2. For testing, `RESEND_FROM_EMAIL` can be `Vedanova Chemicals <onboarding@resend.dev>`. For production, **verify a domain you control** and use an address on it.
3. Create `.env.local` from `.env.example` (never commit it):

```env
RESEND_API_KEY=re_...your_real_key...
CONTACT_EMAIL=startupsfriend2@gmail.com
RESEND_FROM_EMAIL=Vedanova Chemicals <onboarding@resend.dev>
```

4. Recommended on Vercel: add Upstash Redis (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) so the rate limit is shared across instances. Without it, the limit only applies within one instance.
5. Restart `npm run dev` after editing environment variables.

**Switching to the official recipient:** change `CONTACT_EMAIL` in Vercel (Project Settings, Environment Variables) to the official address, then redeploy. No code change is needed.

A success message means Resend accepted the email. It does not confirm inbox delivery, so check the recipient inbox after each change.

**Important:** The enquiry form is complete and sends via the Resend REST API when configured, but **cannot deliver emails until a genuine API key and verified sender identity are supplied**. It returns an accurate error rather than showing a false success. Do not commit `.env.local` to Git or put an API key in browser code.

The form has input validation, a honeypot for basic spam resistance, escaped HTML, and server-only API key use. For production, configure an external IP-based rate limit and/or Cloudflare Turnstile (or provider WAF). An in-memory throttle is not reliable on a scalable serverless deployment.

## Deploy to Vercel

1. Push the repository to GitHub and import it into Vercel as a Next.js project.
2. Add the environment variables listed above under Vercel Project Settings → Environment Variables (production and preview separately if needed).
3. Deploy and test `/contact` after connecting the sending domain and verifying DNS.
4. Connect the client's domain and set `NEXT_PUBLIC_SITE_URL` to its final HTTPS domain, then redeploy.

## Content to confirm before client approval

- Verify the exact legal name, address, phone, email and CIN from the supplied company signage.
- Confirm actual product list, grades, SDS/COA availability, supply regions, minimum quantities, and lead times. The website intentionally does not invent these.
- Approve the privacy policy and make operational decisions regarding message retention and access.
- Replace stock industrial imagery with properly licensed client-approved photographs if desired. These images are **illustrative**, not photographs of Vedanova-owned facilities.
- Add or revise industry/sector claims to match actual trading activities.

## Image use

Original logo supplied by client; retained as `public/images/vedanova-logo.png` and icon derivative.

The current design uses remotely loaded industry imagery available under the Unsplash License. Source/photo credits for future reference:

- Hazel J — https://unsplash.com/photos/vast-industrial-complex-with-pipes-tanks-and-buildings-9KeG7W4cI5U
- Haberdoedas — https://unsplash.com/photos/industrial-machinery-with-pipes-and-tanks-indoors-iENM_LrJv9s
- Haberdoedas — https://unsplash.com/photos/industrial-pipes-and-machinery-inside-a-facility-TWlmgguC8HI

These remote images require an internet connection. If offline or the CDN is unavailable, themed background colours remain visible. The images must not be represented as Vedanova's property, plant or equipment.

## Security / maintenance

Keep Next.js and dependencies updated with patched releases; never expose server secrets to the browser. Audit deployment form submissions, implement managed rate limiting, protect mailbox access, and monitor email delivery. Use a client-owned domain and email identity.
