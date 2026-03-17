

# 🚀 Agence Digitale — Meknes, Morocco

A bilingual (French + Arabic/RTL) digital agency website designed to dominate local search, convert visitors into clients, and scale through programmatic SEO.

---

## Phase 1: Foundation & Core Pages

### Site Architecture & Routing
- **Homepage** (`/`) — Authority page with hero, services overview, trust elements, CTA
- **Services Hub** (`/services`) — Overview of all services
  - `/services/creation-site-web` — Web Development
  - `/services/referencement-seo` — SEO
  - `/services/marketing-digital` — Digital Marketing
- **Location Pages** (`/meknes`, `/fes`, `/rabat`, etc.) — Programmatic local pages
- **Blog** (`/blog`) — Content hub for topical authority
- **Contact** (`/contact`) — Lead capture form
- **Portfolio** (`/realisations`) — Case studies & projects
- **About** (`/a-propos`) — Team, mission, trust

### Bilingual Support (French + Arabic)
- Language switcher in header
- RTL layout support for Arabic
- All content stored in Supabase with `locale` field
- URL prefix pattern: `/ar/...` for Arabic versions

---

## Phase 2: High-Conversion Homepage

### Section Structure
1. **Hero** — Bold headline + subtitle + dual CTA (WhatsApp + Devis gratuit) + trust badges
2. **Services Grid** — 3 service cards with icons, brief descriptions, links
3. **Results/Stats Bar** — Projects completed, clients served, cities covered
4. **Portfolio Preview** — 3 featured projects with screenshots
5. **Testimonials** — Client quotes with names, companies, photos
6. **Process** — 4-step visual workflow (Consultation → Stratégie → Développement → Résultats)
7. **Blog Preview** — Latest 3 articles
8. **Final CTA** — "Demandez votre devis gratuit" with contact form
9. **Footer** — Contact info, social links, service links, location (Meknes)

---

## Phase 3: Backend (Supabase via Lovable Cloud)

### Database Tables
- **leads** — Contact form submissions (name, email, phone, service, message, source_page, created_at)
- **blog_posts** — Title, slug, content, excerpt, featured_image, category, locale, meta_title, meta_description, published_at
- **services** — Name, slug, description, features, pricing_from, locale
- **projects** (portfolio) — Title, client, description, images, service_type, url, locale
- **testimonials** — Client name, company, quote, rating, locale
- **cities** — Name, slug, locale (for programmatic pages)
- **programmatic_pages** — city_id, service_id, generated content, meta tags

### Edge Functions
- **submit-lead** — Validates & saves contact form, sends notification
- **blog-api** — CRUD for blog posts (admin)

### Authentication
- Admin login for managing blog posts, portfolio, leads dashboard

---

## Phase 4: Programmatic SEO Engine

### Template System
Generate pages for every `{service} × {city}` combination:
- `/creation-site-web-meknes`
- `/agence-seo-fes`
- `/marketing-digital-rabat`
- etc.

### Variables
- `{service_name}`, `{city_name}`, `{city_description}`, `{service_features}`, `{local_stats}`, `{pricing_from}`

### Scale
- 3 services × 12+ cities = 36+ unique landing pages
- Each with unique meta titles, descriptions, and localized content

---

## Phase 5: Blog & Content System

### Content Clusters
- **Web Development**: "Combien coûte un site web au Maroc", "Site vitrine vs e-commerce", "WordPress vs sur mesure"
- **SEO**: "Comment référencer son site au Maroc", "SEO local Meknes", "Audit SEO gratuit"
- **Marketing Digital**: "Publicité Facebook Maroc", "Stratégie réseaux sociaux", "Email marketing pour PME"

### Blog Features
- Category filtering
- Related posts
- SEO-optimized with structured data
- Share buttons (WhatsApp, Facebook)

---

## Phase 6: Technical SEO & Performance

- **Meta tags** — Dynamic per-page title, description, OG tags
- **Schema markup** — LocalBusiness, Service, Article, FAQ, BreadcrumbList
- **Sitemap** — Auto-generated including programmatic pages
- **Core Web Vitals** — Lazy loading images, optimized fonts, minimal JS
- **Internal linking** — Automated between services ↔ blog ↔ location pages
- **Bilingual hreflang tags** — fr/ar alternate links

---

## Phase 7: Admin Dashboard

- **Leads Management** — View, filter, export contact submissions
- **Blog CMS** — Create/edit/publish articles with rich text
- **Portfolio Manager** — Add/edit projects
- **Analytics Overview** — Lead count, page views summary

---

## Design Direction
- Modern, professional, clean aesthetic
- Primary colors: Deep blue (#1e3a5f) + Gold accent (#d4a843)
- Arabic typography: Cairo or Tajawal font
- French typography: Inter or Poppins
- Mobile-first responsive design
- WhatsApp floating button on all pages

