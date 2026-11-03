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
 return <form className="c-form" onSubmit={handleSubmit} id="enquiry" noValidate={false}>
   <div className="c-form-intro">
     <p className="c-label"><span className="c-label-rule" aria-hidden="true" />Product enquiry</p>
     <h2 className="c-form-title">Tell us what you need.</h2>
     <p className="c-form-lead">Share your chemical requirements and contact information for a sourcing discussion.</p>
   </div>
   <div className="c-grid">
     <label className="c-field">
       <span className="c-field-label">Full name <span className="c-req" aria-hidden="true">*</span></span>
       <input className="c-input" name="name" type="text" minLength={2} maxLength={120} autoComplete="name" placeholder="Your full name" required/>
     </label>
     <label className="c-field">
       <span className="c-field-label">Company name <span className="c-opt">(optional)</span></span>
       <input className="c-input" name="company" type="text" maxLength={150} autoComplete="organization" placeholder="Your company"/>
     </label>
     <label className="c-field">
       <span className="c-field-label">Email address <span className="c-req" aria-hidden="true">*</span></span>
       <input className="c-input" name="email" type="email" maxLength={254} autoComplete="email" placeholder="name@company.com" required/>
     </label>
     <label className="c-field">
       <span className="c-field-label">Phone number <span className="c-req" aria-hidden="true">*</span></span>
       <input className="c-input" name="phone" type="tel" maxLength={25} autoComplete="tel" placeholder="+91 XXXXX XXXXX" required/>
     </label>
     <label className="c-field">
       <span className="c-field-label">Product category <span className="c-req" aria-hidden="true">*</span></span>
       <select className="c-input c-select" name="product" value={product} onChange={e=>setProduct(e.target.value)} required>
         <option value="" disabled>Select a category</option>
         <option>Industrial Solvents</option>
         <option>Recovered Solvents</option>
         <option>Petrochemicals</option>
         <option>Other Chemical Requirement</option>
       </select>
     </label>
     <label className="c-field">
       <span className="c-field-label">Required quantity <span className="c-opt">(optional)</span></span>
       <input className="c-input" name="quantity" type="text" maxLength={100} placeholder="e.g. 5 MT, 20 drums"/>
     </label>
     <label className="c-field c-field-wide">
       <span className="c-field-label">Requirement details <span className="c-req" aria-hidden="true">*</span></span>
       <textarea className="c-input c-textarea" name="message" rows={5} minLength={10} maxLength={4000} required placeholder="Chemical name, grade or specification, delivery location and any other details."/>
     </label>
   </div>
   <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" type="text" tabIndex={-1} autoComplete="off"/></label></div>
   <p className="c-privacy">By submitting, you agree to be contacted about your enquiry. See our <a href="/privacy">Privacy Policy</a>.</p>
   {status && <div className={`c-alert c-alert-${status.type}`} role="status" aria-live="polite">{status.type==='success'?<CheckCircle2 size={19} aria-hidden="true"/>:<AlertCircle size={19} aria-hidden="true"/>} <span>{status.message}</span></div>}
   <button type="submit" className="btn btn-accent c-submit" disabled={loading} aria-busy={loading}>
     {loading ? <>Sending enquiry <LoaderCircle className="spinner" size={18} aria-hidden="true"/></> : <>Send Enquiry <ArrowUpRight className="arrow" size={18} aria-hidden="true"/></>}
   </button>
 </form>;
}
