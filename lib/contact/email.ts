import type { Enquiry } from './validate';

/**
 * Public absolute logo URL for email clients.
 * Supports override via NEXT_PUBLIC_SITE_URL or VEDANOVA_LOGO_URL if configured,
 * defaulting to the live production asset URL.
 */
export const VEDANOVA_LOGO_URL =
  process.env.VEDANOVA_LOGO_URL ||
  (process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '')}/images/vedanova-logo.png`
    : 'https://vedanova-chemicals.vercel.app/images/vedanova-logo.png');

/** Escapes text for safe inclusion in HTML. Every customer-supplied value goes through this. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Current date and time in India Standard Time, for the email body. */
export function formatIst(date: Date): string {
  const formatted = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
  return `${formatted} IST`;
}

/** Subject line. Names are stripped of line breaks and capped, so they cannot inject headers. */
export function enquirySubject(name: string): string {
  const safeName = name.replace(/[\r\n]+/g, ' ').slice(0, 80);
  return `New Product Enquiry | Vedanova Chemicals | ${safeName}`;
}

const ROWS: [string, keyof Enquiry][] = [
  ['Full Name', 'name'],
  ['Company Name', 'company'],
  ['Email Address', 'email'],
  ['Phone Number', 'phone'],
  ['Product Category', 'product'],
  ['Required Quantity', 'quantity'],
];

export function enquiryHtml(
  enquiry: Enquiry,
  submittedAt: string,
  logoUrl: string = VEDANOVA_LOGO_URL
): string {
  const rows = ROWS.map(([label, key]) => {
    const raw = enquiry[key];
    const displayValue = raw && raw.trim().length > 0 ? escapeHtml(raw) : 'Not specified';
    const isUnspecified = !raw || raw.trim().length === 0;

    return `<tr>
      <td style="padding:12px 14px;border-bottom:1px solid #e6e8ef;font-size:12px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;color:#5a6178;width:34%;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #e6e8ef;font-size:14px;line-height:1.5;color:${isUnspecified ? '#8c93a8' : '#141a38'};vertical-align:top;${isUnspecified ? 'font-style:italic;' : 'font-weight:500;'}">${displayValue}</td>
    </tr>`;
  }).join('');

  const displayMessage =
    enquiry.message && enquiry.message.trim().length > 0
      ? escapeHtml(enquiry.message)
      : 'Not specified';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Product Enquiry | Vedanova Chemicals</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f2ed;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <!-- Outer Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f2ed;padding:32px 12px;">
    <tr>
      <td align="center">
        <!-- Inner Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 18px rgba(10,16,48,0.06);border:1px solid #e4e1d8;">
          
          <!-- Header: Dark Navy with Orange Accent Line -->
          <tr>
            <td style="background-color:#0a1030;padding:26px 30px;border-bottom:3px solid #e94826;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <!-- Brand Plate for logo clarity -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border-radius:4px;padding:6px 12px;display:inline-block;">
                      <tr>
                        <td align="center" valign="middle">
                          <img
                            src="${escapeHtml(logoUrl)}"
                            alt="Vedanova Chemicals"
                            width="180"
                            style="display:block;width:180px;max-width:180px;height:auto;border:0;outline:none;text-decoration:none;"
                          />
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle" style="padding-left:16px;">
                    <span style="display:inline-block;padding:4px 10px;background-color:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:4px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#ff8a63;font-weight:600;">
                      New Enquiry
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Intro -->
          <tr>
            <td style="padding:28px 30px 12px;background-color:#ffffff;">
              <h1 style="margin:0 0 8px;font-size:20px;font-weight:700;line-height:1.3;color:#0a1030;">
                Product Sourcing Enquiry
              </h1>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#5a6178;">
                A new enquiry was submitted via the website contact form on <strong style="color:#0a1030;">${escapeHtml(submittedAt)}</strong>.
              </p>
            </td>
          </tr>

          <!-- Customer & Requirement Fields Table -->
          <tr>
            <td style="padding:10px 18px 8px;background-color:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;">
                ${rows}
              </table>
            </td>
          </tr>

          <!-- Detailed Message Box -->
          <tr>
            <td style="padding:16px 30px 24px;background-color:#ffffff;">
              <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;color:#0a1030;margin-bottom:8px;">
                Detailed Requirements
              </div>
              <div style="white-space:pre-wrap;font-size:14px;line-height:1.65;color:#141a38;background-color:#f8f8fa;border:1px solid #e6e8ef;border-left:3px solid #e94826;border-radius:4px;padding:14px 16px;">${displayMessage}</div>
            </td>
          </tr>

          <!-- Reply-To & Corporate Footer -->
          <tr>
            <td style="padding:18px 30px;background-color:#f9f9fc;border-top:1px solid #e8e9f0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:12px;line-height:1.6;color:#5a6178;">
                    <strong>Direct Reply:</strong> Simply reply to this email to contact the customer directly at <a href="mailto:${escapeHtml(enquiry.email)}" style="color:#c4341a;text-decoration:none;font-weight:600;">${escapeHtml(enquiry.email)}</a> (Reply-To configured).
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:10px;font-size:11px;line-height:1.5;color:#8a90a4;">
                    Vedanova Chemicals Private Limited &bull; Vadodara, Gujarat, India &bull; Sourcing &amp; Trading
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function enquiryText(enquiry: Enquiry, submittedAt: string): string {
  const val = (s?: string) => (s && s.trim().length > 0 ? s.trim() : 'Not specified');

  return [
    '==================================================',
    ' VEDANOVA CHEMICALS — NEW PRODUCT ENQUIRY',
    '==================================================',
    '',
    `Submission Date/Time: ${submittedAt}`,
    '',
    'CUSTOMER DETAILS:',
    `• Full Name:         ${val(enquiry.name)}`,
    `• Company Name:      ${val(enquiry.company)}`,
    `• Email Address:     ${val(enquiry.email)}`,
    `• Phone Number:      ${val(enquiry.phone)}`,
    `• Product Category:  ${val(enquiry.product)}`,
    `• Required Quantity: ${val(enquiry.quantity)}`,
    '',
    'DETAILED REQUIREMENTS:',
    '--------------------------------------------------',
    val(enquiry.message),
    '--------------------------------------------------',
    '',
    `Reply directly to this email to contact ${val(enquiry.name)} (${val(enquiry.email)}).`,
    'Vedanova Chemicals Private Limited | Vadodara, Gujarat, India',
    '==================================================',
  ].join('\n');
}
