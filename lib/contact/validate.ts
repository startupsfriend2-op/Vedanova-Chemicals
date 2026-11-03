// Server-side validation for enquiry submissions. The frontend is never trusted: every field is checked here.
export const PRODUCT_CATEGORIES = ['Industrial Solvents', 'Recovered Solvents', 'Petrochemicals', 'Other Chemical Requirement'] as const;

export type Enquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
};

export type ValidationResult = { ok: true; enquiry: Enquiry } | { ok: false; field: keyof Enquiry; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d\s()-]+$/;

/** Trims and caps a string field. Non-strings become empty. Line breaks are removed from single-line fields. */
function field(input: unknown, max: number, singleLine = true): string {
  if (typeof input !== 'string') return '';
  const value = singleLine ? input.replace(/[\r\n\t]+/g, ' ') : input;
  return value.trim().slice(0, max + 1);
}

export function validateEnquiry(data: Record<string, unknown>): ValidationResult {
  const enquiry: Enquiry = {
    name: field(data.name, 120),
    company: field(data.company, 150),
    email: field(data.email, 254),
    phone: field(data.phone, 25),
    product: field(data.product, 100),
    quantity: field(data.quantity, 100),
    message: field(data.message, 4000, false),
  };
  if (enquiry.name.length < 2 || enquiry.name.length > 120) return { ok: false, field: 'name', message: 'Please enter your full name (2 to 120 characters).' };
  if (enquiry.company.length > 150) return { ok: false, field: 'company', message: 'Company name is too long.' };
  if (!EMAIL.test(enquiry.email)) return { ok: false, field: 'email', message: 'Please enter a valid email address.' };
  if (enquiry.phone.length < 7 || enquiry.phone.length > 25 || !PHONE.test(enquiry.phone)) return { ok: false, field: 'phone', message: 'Please enter a valid phone number.' };
  if (!(PRODUCT_CATEGORIES as readonly string[]).includes(enquiry.product)) return { ok: false, field: 'product', message: 'Please choose a product category.' };
  if (enquiry.quantity.length > 100) return { ok: false, field: 'quantity', message: 'Quantity is too long.' };
  if (enquiry.message.length < 10 || enquiry.message.length > 4000) return { ok: false, field: 'message', message: 'Please describe your requirement (10 to 4000 characters).' };
  return { ok: true, enquiry };
}
