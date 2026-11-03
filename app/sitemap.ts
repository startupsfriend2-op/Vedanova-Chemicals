import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { const base=process.env.NEXT_PUBLIC_SITE_URL || 'https://vedanova-chemicals.vercel.app'; return ['','about','products','industries','contact','privacy'].map(p=>({url:`${base}/${p}`,changeFrequency:'monthly' as const,priority:p===''?1:0.7})); }
