import type { Enquiry } from './validate';

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
  ['Customer full name', 'name'],
  ['Company name', 'company'],
  ['Email address', 'email'],
  ['Phone number', 'phone'],
  ['Product category', 'product'],
  ['Required quantity', 'quantity'],
];

export function enquiryHtml(enquiry: Enquiry, submittedAt: string): string {
  const rows = ROWS.map(([label, key]) => {
    const value = enquiry[key];
    return `<tr>
      <td style="padding:12px 14px;border-bottom:1px solid #e6e8ef;font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:#5a6178;width:36%;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #e6e8ef;font-size:15px;color:#141a38;vertical-align:top">${escapeHtml(value || '-')}</td>
    </tr>`;
  }).join('');

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f4f2ed;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2ed;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:6px;overflow:hidden">
  <tr><td style="background:#0a1030;padding:22px 28px">
    <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#ff8a63">New product enquiry</div>
    <div style="font-size:22px;font-weight:700;color:#ffffff;margin-top:6px">Vedanova Chemicals</div>
  </td></tr>
  <tr><td style="padding:24px 28px 8px">
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#141a38">A new enquiry was submitted through the website contact form on <strong>${escapeHtml(submittedAt)}</strong>.</p>
  </td></tr>
  <tr><td style="padding:0 14px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
  <tr><td style="padding:20px 28px 8px">
    <div style="font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:#5a6178;margin-bottom:8px">Detailed requirements</div>
    <div style="white-space:pre-wrap;font-size:15px;line-height:1.7;color:#141a38;background:#f7f7fa;border:1px solid #e6e8ef;border-radius:4px;padding:14px 16px">${escapeHtml(enquiry.message)}</div>
  </td></tr>
  <tr><td style="padding:18px 28px 26px;font-size:12px;line-height:1.6;color:#5a6178">
    Reply to this email to contact the customer directly. Reply-To is set to the customer's email address.
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

export function enquiryText(enquiry: Enquiry, submittedAt: string): string {
  return [
    'New product enquiry from the Vedanova Chemicals website',
    '',
    `Submitted: ${submittedAt}`,
    `Customer full name: ${enquiry.name}`,
    `Company name: ${enquiry.company || '-'}`,
    `Email address: ${enquiry.email}`,
    `Phone number: ${enquiry.phone}`,
    `Product category: ${enquiry.product}`,
    `Required quantity: ${enquiry.quantity || '-'}`,
    '',
    'Detailed requirements:',
    enquiry.message,
  ].join('\n');
}
