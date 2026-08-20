import { cities, services } from './src/lib/seo-data.ts';
import { articles } from './src/data/blog-articles.ts';
import fs from 'node:fs';

const rows = [];

// Core pages
rows.push({ url: '/', title: 'Ayoub Touati | Expert Digital au Maroc — Création Site Web, SEO & Montage Vidéo' });
rows.push({ url: '/services', title: 'Services création site web Maroc | SEO freelancer Maroc' });
rows.push({ url: '/tarifs', title: 'Prix Site Web & SEO Maroc 2026 | Tarifs Transparents | Ayoub Touati' });
rows.push({ url: '/contact', title: 'Contact | Développeur Web Freelance au Maroc — Ayoub Touati' });
rows.push({ url: '/a-propos', title: 'À propos — Ayoub Touati | Expert Digital au Maroc' });
rows.push({ url: '/blog', title: 'Blog | Développeur Web Freelance & Expert SEO au Maroc' });
rows.push({ url: '/realisations', title: 'Portfolio | Création de Site Web et Développement WordPress au Maroc' });
rows.push({ url: '/audit-seo-gratuit', title: "Audit SEO Gratuit pour votre Site Web au Maroc — Analyse Complète | Ayoub Touati" });
rows.push({ url: '/agence-digitale-maroc', title: 'Développeur Freelance au Maroc — Création Site Web, SEO & Montage Vidéo | Ayoub Touati' });

// Service pages — title = service.metaTitle
services.forEach(s => rows.push({ url: `/services/${s.slug}`, title: s.metaTitle, h1: s.name }));

// City hub pages — title template from CityPage.tsx
cities.forEach(c => rows.push({ url: `/agence-digitale-${c.slug}`, title: `Développeur Web ${c.name} : Devis en 24h sans frais d'agence | Ayoub Touati`, h1: `Développeur Web à ${c.name} : Devis en 24h sans frais d'agence` }));

// Service x City combo pages — title template from ServiceCityPage.tsx
services.forEach(s => cities.forEach(c => {
  rows.push({
    url: `/${s.slug}-${c.slug}`,
    title: `${s.name} à ${c.name} | Expert Digital Maroc`,
    h1: `${s.name} à ${c.name}`,
  });
}));

// Blog articles
Object.values(articles).forEach(a => rows.push({ url: `/blog/${a.slug}`, title: a.metaTitle, h1: a.title }));

console.log(`Total simulated pages: ${rows.length}`);

// Duplicate title check
const titleMap = {};
rows.forEach(r => { (titleMap[r.title] ||= []).push(r.url); });
const dupTitles = Object.entries(titleMap).filter(([, v]) => v.length > 1);
console.log(`\nDuplicate titles: ${dupTitles.length}`);
dupTitles.forEach(([t, v]) => console.log(`  "${t}" -> ${v.join(', ')}`));

// Duplicate H1 check (only rows with h1)
const h1Map = {};
rows.filter(r => r.h1).forEach(r => { (h1Map[r.h1] ||= []).push(r.url); });
const dupH1 = Object.entries(h1Map).filter(([, v]) => v.length > 1);
console.log(`\nDuplicate H1: ${dupH1.length}`);
dupH1.forEach(([t, v]) => console.log(`  "${t}" -> ${v.join(', ')}`));

// Duplicate URL check (sanity — cannibalization / route collision)
const urlMap = {};
rows.forEach(r => { (urlMap[r.url] ||= []).push(r.url); });
const dupUrls = Object.entries(urlMap).filter(([, v]) => v.length > 1);
console.log(`\nDuplicate URLs (route collisions): ${dupUrls.length}`);
dupUrls.forEach(([u]) => console.log(`  ${u}`));

fs.writeFileSync('__crawl_rows.json', JSON.stringify(rows, null, 2));
console.log('\nSaved __crawl_rows.json');
