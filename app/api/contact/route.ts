import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';

function text(input: unknown, maxLength: number): string {
  return typeof input === 'string' ? input.trim().slice(0, maxLength + 1) : '';
}
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const safe = (input: string) => input.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const allowedProducts = new Set(['Industrial Solvents','Recovered Solvents','Petrochemicals','Other Chemical Requirement']);

export async function POST(request: NextRequest) {
  if (Number(request.headers.get('content-length') || 0) > 15000) {
    return NextResponse.json({error:'Enquiry is too long.'},{status:413});
  }
  let data: Record<string,unknown>;
  try { const body = await request.json(); if (!body || typeof body !== 'object' || Array.isArray(body)) throw Error(); data = body; }
  catch { return NextResponse.json({error:'Invalid form submission.'},{status:400}); }

  // Honeypot: don't disclose spam rules to automated submitters.
  if (text(data.website,200)) return NextResponse.json({success:true});
  const name=text(data.name,120), company=text(data.company,150), email=text(data.email,254);
  const phone=text(data.phone,25), product=text(data.product,100), quantity=text(data.quantity,100), message=text(data.message,4000);
  if (name.length<2 || name.length>120 || !validEmail.test(email) || email.length>254 || phone.length<7 || phone.length>25 || !/^[+\d\s()\-]+$/.test(phone) || !allowedProducts.has(product) || message.length<10 || message.length>4000 || company.length>150 || quantity.length>100) {
    return NextResponse.json({error:'Please enter a valid name, email, phone, product category and requirement details.'},{status:400});
  }
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL || RESEND_API_KEY==='re_replace_me') {
    console.error('Contact endpoint is missing Resend email configuration.');
    return NextResponse.json({error:'Online enquiries are not configured yet. Please contact us by phone or email.'},{status:503});
  }
  const plain = `New enquiry from Vedanova Chemicals website\n\nName: ${name}\nCompany: ${company||'-'}\nEmail: ${email}\nPhone: ${phone}\nCategory: ${product}\nQuantity: ${quantity||'-'}\n\nRequirement:\n${message}`;
  const html = `<div style="font-family:Arial,sans-serif;color:#1d2552;max-width:650px;margin:auto"><h2>New Vedanova Website Enquiry</h2><table cellpadding="7" style="border-collapse:collapse;width:100%">${[['Name',name],['Company',company],['Email',email],['Phone',phone],['Category',product],['Quantity',quantity]].map(([k,v])=>`<tr><td style="border-bottom:1px solid #eee;font-weight:bold">${safe(k)}</td><td style="border-bottom:1px solid #eee">${safe(v||'-')}</td></tr>`).join('')}</table><h3>Requirement</h3><p style="white-space:pre-wrap">${safe(message)}</p></div>`;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method:'POST', headers: {Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type':'application/json'},
      body:JSON.stringify({from:CONTACT_FROM_EMAIL,to:[CONTACT_TO_EMAIL],reply_to:email,subject:`Vedanova Website Enquiry — ${product}`,text:plain,html}),
      cache:'no-store',signal:AbortSignal.timeout(12000)
    });
    if (!res.ok) { console.error('Resend mail delivery error',res.status,(await res.text()).slice(0,400)); return NextResponse.json({error:'We could not deliver your enquiry. Please contact us directly by email or phone.'},{status:502}); }
    return NextResponse.json({success:true});
  } catch (err) {
    console.error('Email API unavailable',err);
    return NextResponse.json({error:'Enquiry service is temporarily unavailable. Please use email or phone.'},{status:502});
  }
}
