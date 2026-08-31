import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin user ──────────────────────────────────────────────────────────
  // SECURITY FIX (Stage 2 admin audit): this used to hardcode a fixed,
  // weak, publicly-readable default admin credential directly in source. If
  // this was ever run against the production database, that account may still
  // exist with that password; rotate it immediately from /admin/settings if
  // so. Seeding now requires SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD to be set
  // (refuses to run without them, so no more predictable default lands in
  // the database) and never prints the password.
  const seedEmail = process.env.SEED_ADMIN_EMAIL;
  const seedPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!seedEmail || !seedPassword) {
    console.warn(
      "⚠️  SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — skipping admin user seed " +
      "(no more hardcoded default credential). Create the admin account via a one-off " +
      "script or database console instead.",
    );
  } else {
    const hashedPassword = await bcrypt.hash(seedPassword, 10);
    const admin = await prisma.user.upsert({
      where:  { email: seedEmail },
      update: {},
      create: {
        name:     "Admin",
        email:    seedEmail,
        password: hashedPassword,
        role:     "admin",
      },
    });
    console.log(`✅ Admin user ensured: ${admin.email} (password not logged)`);
  }

  // ─── Sample services ─────────────────────────────────────────────────────
  await prisma.service.upsert({
    where:  { slug: "creation-site-web" },
    update: {},
    create: {
    
      slug:              "creation-site-web",
      name:              "Création de Site Web",
      short_description: "Des sites web professionnels, rapides et optimisés pour le SEO.",
      badge:             "Populaire",
      icon:              "Globe",
      cta_label:         "Demander un devis",
      featured:          true,
      published:         true,
      sort_order:        1,
    },
  });

  await prisma.service.upsert({
    where:  { slug: "referencement-seo" },
    update: {},
    create: {
      slug:              "referencement-seo",
      name:              "SEO & Référencement",
      short_description: "Améliorez votre visibilité sur Google et attirez plus de clients.",
      badge:             "ROI garanti",
      icon:              "TrendingUp",
      cta_label:         "Audit gratuit",
      featured:          true,
      published:         true,
      sort_order:        2,
    },
  });
  console.log("✅ Sample services created");

  // ─── Sample blog posts ───────────────────────────────────────────────────
  await prisma.blogPost.upsert({
    where:  { slug: "tendances-dev-seo-maroc-2025" },
    update: {},
    create: {
      title:            "Les tendances développement web et SEO au Maroc en 2025",
      slug:             "tendances-dev-seo-maroc-2025",
      excerpt:          "Découvrez les tendances techniques qui vont façonner les sites web marocains.",
      content:          "<p>Le développement web marocain progresse vite : sites plus rapides, SEO technique, IA utile et expériences mobiles plus solides.</p>",
      meta_title:       "Tendances Développement Web & SEO Maroc 2025",
      meta_description: "Les grandes tendances développement web et SEO technique au Maroc pour 2025.",
      published:        true,
    },
  });
  console.log("✅ Sample blog post created");

  // Sample testimonial deliberately removed (Stage 2 audit, Aug 2026): this
  // used to seed a fabricated "Karim Benali / Optique Benali / Forge Scale"
  // review — "Forge Scale" is this project's own backend codename, not a
  // real client, and it was rendering on the live homepage as if genuine.
  // No fake reviews are seeded, ever — only real ones entered via
  // /admin/testimonials belong in this table.

  console.log("\n🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
