CREATE DATABASE IF NOT EXISTS forge_scale
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE forge_scale;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL DEFAULT 'Admin Forge',
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor', 'viewer') NOT NULL DEFAULT 'admin',
  last_login_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS name VARCHAR(120) NOT NULL DEFAULT 'Admin Forge' AFTER id,
  ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP NULL DEFAULT NULL AFTER role;

CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NULL,
  service VARCHAR(120) NULL,
  message TEXT NULL,
  source VARCHAR(120) NULL DEFAULT 'contact-page',
  status ENUM('new', 'contacted', 'closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_leads_status (status),
  INDEX idx_leads_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  excerpt VARCHAR(500) NULL,
  content LONGTEXT NULL,
  cover_image VARCHAR(500) NULL,
  meta_title VARCHAR(70) NULL,
  meta_description VARCHAR(180) NULL,
  keyword_focus VARCHAR(120) NULL,
  locale VARCHAR(5) NOT NULL DEFAULT 'fr',
  published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_blog_published (published),
  INDEX idx_blog_slug (slug)
);

ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS excerpt VARCHAR(500) NULL AFTER slug,
  ADD COLUMN IF NOT EXISTS content LONGTEXT NULL AFTER excerpt,
  ADD COLUMN IF NOT EXISTS cover_image VARCHAR(500) NULL AFTER content,
  ADD COLUMN IF NOT EXISTS meta_title VARCHAR(70) NULL AFTER cover_image,
  ADD COLUMN IF NOT EXISTS meta_description VARCHAR(180) NULL AFTER meta_title,
  ADD COLUMN IF NOT EXISTS keyword_focus VARCHAR(120) NULL AFTER meta_description,
  ADD COLUMN IF NOT EXISTS locale VARCHAR(5) NOT NULL DEFAULT 'fr' AFTER keyword_focus;

CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(160) NOT NULL,
  company VARCHAR(160) NULL,
  company_ar VARCHAR(160) NULL,
  quote VARCHAR(600) NOT NULL,
  quote_ar VARCHAR(600) NULL,
  rating TINYINT NOT NULL DEFAULT 5,
  service_slug VARCHAR(120) NULL,
  city VARCHAR(120) NULL,
  featured BOOLEAN NOT NULL DEFAULT TRUE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_testimonials_featured (featured),
  INDEX idx_testimonials_published (published)
);

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  name_ar VARCHAR(160) NULL,
  short_description VARCHAR(320) NOT NULL,
  short_description_ar VARCHAR(320) NULL,
  price_from VARCHAR(80) NULL,
  badge VARCHAR(80) NULL,
  icon VARCHAR(80) NULL,
  cta_label VARCHAR(80) NULL,
  featured BOOLEAN NOT NULL DEFAULT TRUE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_services_featured (featured),
  INDEX idx_services_published (published)
);

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NULL,
  results VARCHAR(400) NULL,
  image_url VARCHAR(500) NULL,
  service_type VARCHAR(120) NULL,
  client_name VARCHAR(200) NULL,
  live_url VARCHAR(500) NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_projects_featured (featured),
  INDEX idx_projects_service_type (service_type)
);

ALTER TABLE projects
  MODIFY COLUMN results VARCHAR(400) NULL;

CREATE TABLE IF NOT EXISTS project_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_project_images_project
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  action VARCHAR(100) NOT NULL,
  entity VARCHAR(100) NULL,
  entity_id VARCHAR(100) NULL,
  details JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_activity_created_at (created_at),
  CONSTRAINT fk_activity_logs_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

INSERT IGNORE INTO users (id, name, email, password_hash, role)
VALUES (
  1,
  'Ayoub Touati',
  'admin@touatiayoub.com',
  '$2a$10$J..3vYHeZXmHRPtzHqh.L.EU4y02PtLy4CFmGz0XFNQ/MG3nPJg62',
  'admin'
);

INSERT IGNORE INTO services (
  id, slug, name, name_ar, short_description, short_description_ar,
  price_from, badge, icon, cta_label, featured, published, sort_order
) VALUES
  (1, 'creation-site-web', 'creation site web Maroc', 'تصميم مواقع احترافية في المغرب', 'Landing pages, sites vitrines et plateformes rapides pour capter des leads au Maroc.', 'صفحات هبوط ومواقع تعريفية ومنصات سريعة لجذب العملاء المحتملين في المغرب.', '1 000 MAD', 'Best seller', 'Globe', 'Demander un devis', TRUE, TRUE, 1),
  (2, 'referencement-seo', 'SEO freelancer Maroc', 'خبير سيو مستقل في المغرب', 'Audit, contenu et netlinking local pour remonter sur Google au Maroc.', 'تدقيق ومحتوى وروابط محلية لرفع ترتيبك على Google في المغرب.', '2 000 MAD/mois', 'Croissance', 'Search', 'Lancer le SEO', TRUE, TRUE, 2),
  (3, 'marketing-digital', 'developpeur web freelance Maroc + acquisition', 'مطور ويب مستقل في المغرب مع اكتساب العملاء', 'Campagnes Meta et Google Ads avec landing pages orientees conversion.', 'حملات Meta وGoogle Ads مع صفحات هبوط موجهة للتحويل.', '2 500 MAD/mois', 'Leads rapides', 'Megaphone', 'Booster les leads', TRUE, TRUE, 3),
  (4, 'montage-video', 'Montage video publicitaire', 'مونتاج فيديو إعلاني', 'Formats reels, ads et brand content pour gagner en attention.', 'صياغات Reels وإعلانات ومحتوى علامة تجارية لزيادة الانتباه.', '500 MAD', NULL, 'Video', 'Produire ma video', TRUE, TRUE, 4),
  (5, 'email-marketing', 'Email marketing automation', 'أتمتة التسويق عبر البريد', 'Sequences et newsletters pour nurturer vos leads et recuperer les ventes.', 'تسلسلات ونشرات لبناء العلاقة مع العملاء واسترجاع المبيعات.', '1 500 MAD/mois', NULL, 'Mail', 'Automatiser mes ventes', TRUE, TRUE, 5),
  (6, 'refonte-site-web', 'WordPress developer Morocco', 'مطوّر ووردبريس في المغرب', 'Refonte WordPress ou React pour accelerer, mieux convertir et mieux ranker.', 'إعادة تصميم WordPress أو React لسرعة أعلى وتحويلات أفضل وترتيب أفضل.', '5 000 MAD', 'Refonte', 'RefreshCw', 'Refondre mon site', TRUE, TRUE, 6),
  (7, 'publicite-reseaux-sociaux', 'Publicite reseaux sociaux', 'اعلانات التواصل الاجتماعي', 'Creatifs, ciblage et pilotage quotidien pour baisser votre cout par lead.', 'تصميمات واستهداف وإدارة يومية لخفض تكلفة العميل المحتمل.', '2 000 MAD/mois', NULL, 'Target', 'Lancer mes ads', TRUE, TRUE, 7),
  (8, 'google-ads', 'creation site internet Maroc pas cher', 'انشاء موقع انترنت اقتصادي في المغرب', 'Offre landing page + Google Ads pour demarrer vite avec un budget maitrise.', 'عرض صفحة هبوط مع Google Ads للانطلاق بسرعة بميزانية مضبوطة.', '2 500 MAD/mois', 'Budget malin', 'Zap', 'Parler budget', TRUE, TRUE, 8);

INSERT IGNORE INTO testimonials (
  id, client_name, company, company_ar, quote, quote_ar, rating,
  service_slug, city, featured, published, sort_order
) VALUES
  (1, 'Ahmed B.', 'Restaurant Le Palais, Meknes', 'مطعم القصر، مكناس', 'Notre nouveau tunnel de contact nous rapporte des demandes chaque semaine et la visibilite locale a clairement monte.', 'مسار التواصل الجديد يجلب لنا طلبات كل أسبوع والظهور المحلي ارتفع بشكل واضح.', 5, 'creation-site-web', 'Meknes', TRUE, TRUE, 1),
  (2, 'Fatima Z.', 'Boutique Zellige, Fes', 'بوتيك الزليج، فاس', 'Le site, le SEO et WhatsApp ont transforme le trafic en vraies conversations commerciales.', 'الموقع والسيو وواتساب حوّلوا الزيارات إلى محادثات تجارية حقيقية.', 5, 'referencement-seo', 'Fes', TRUE, TRUE, 2),
  (3, 'Youssef M.', 'Cabinet Juridique, Rabat', 'مكتب قانوني، الرباط', 'Nous recevons des leads plus qualifies et la page de contact convertit enfin comme il faut.', 'أصبحنا نستقبل عملاء محتملين أكثر جودة وصفحة التواصل صارت تحقق تحويلات فعلاً.', 5, 'marketing-digital', 'Rabat', TRUE, TRUE, 3);
