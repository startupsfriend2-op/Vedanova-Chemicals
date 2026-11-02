'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle, AlertCircle } from 'lucide-react';
type Status = { type: 'success'|'error'; message: string } | null;
export default function ContactForm() {
 const [loading, setLoading] = useState(false);
 const [status, setStatus] = useState<Status>(null);
 const [product, setProduct] = useState('');
 useEffect(()=>{ const param = new URLSearchParams(window.location.search).get('product'); if(param) setProduct(param); },[]);
 async function handleSubmit(e: FormEvent<HTMLFormElement>) {
   e.preventDefault(); if(loading) return;
   const form = e.currentTarget;
   setStatus(null); setLoading(true);
   const fields = new FormData(form);
   try {
     const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(fields.entries())) });
     const json = await response.json().catch(()=>({error:'Unexpected server response.'}));
     if(!response.ok) throw new Error(json.error || 'We could not submit your enquiry. Please try again.');
     setStatus({type:'success',message:'Thank you. Your enquiry has been sent to Vedanova Chemicals.'});
     form.reset(); setProduct('');
   } catch (err) { setStatus({type:'error',message: err instanceof Error ? err.message : 'Unable to submit your enquiry right now.'}); }
   finally { setLoading(false); }
 }
 return <form className="contact-form" onSubmit={handleSubmit} id="enquiry" noValidate={false}>
   <div className="form-intro"><span className="eyebrow"><span className="eyebrow-line"/>SEND AN ENQUIRY</span><h2>Tell us what you need.</h2><p>Complete the details below and our team can follow up with you.</p></div>
   <div className="form-row"><label>Full name <span>*</span><input name="name" type="text" minLength={2} maxLength={120} autoComplete="name" placeholder="Your full name" required/></label><label>Company name<input name="company" type="text" maxLength={150} autoComplete="organization" placeholder="Your company (optional)"/></label></div>
   <div className="form-row"><label>Email address <span>*</span><input name="email" type="email" maxLength={254} autoComplete="email" placeholder="name@company.com" required/></label><label>Phone number <span>*</span><input name="phone" type="tel" maxLength={25} autoComplete="tel" placeholder="+91 XXXXX XXXXX" required/></label></div>
   <div className="form-row"><label>Product category <span>*</span><select name="product" value={product} onChange={e=>setProduct(e.target.value)} required><option value="" disabled>Select a category</option><option>Industrial Solvents</option><option>Recovered Solvents</option><option>Petrochemicals</option><option>Other Chemical Requirement</option></select></label><label>Required quantity<input name="quantity" type="text" maxLength={100} placeholder="e.g. 5 MT, 20 drums (optional)"/></label></div>
   <label>Requirement details <span>*</span><textarea name="message" rows={5} minLength={10} maxLength={4000} required placeholder="Chemical name, grade/specification, delivery location and any other details..."/></label>
   <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" type="text" tabIndex={-1} autoComplete="off"/></label></div>
   <p className="form-privacy">By submitting, you agree to be contacted about your enquiry. See our <a href="/privacy">Privacy Policy</a>.</p>
   {status && <div className={`form-alert ${status.type}`} role="status" aria-live="polite">{status.type==='success'?<CheckCircle2 size={19}/>:<AlertCircle size={19}/>} {status.message}</div>}
   <button type="submit" className="btn btn-primary form-submit" disabled={loading}>{loading ? <>Sending Enquiry <LoaderCircle className="spinner" size={18}/></> : <>Send Enquiry <ArrowUpRight size={18}/></>}</button>
 </form>;
}
