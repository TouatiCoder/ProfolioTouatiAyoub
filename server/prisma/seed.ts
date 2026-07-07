import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin user ──────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin1234", 10);

  const admin = await prisma.user.upsert({
    where:  { email: "admin@forge-scale.ma" },
    update: {},
    create: {
      name:     "Admin",
      email:    "admin@forge-scale.ma",
      password: hashedPassword,
      role:     "admin",
    },
  });
  console.log(`✅ Admin user: ${admin.email}`);

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

  // ─── Sample testimonial ───────────────────────────────────────────────────
  await prisma.testimonial.create({
    data: {
      client_name:  "Karim Benali",
      company:      "Optique Benali",
      quote:        "Forge Scale a transformé notre présence en ligne. Le trafic a augmenté de 300% en 6 mois.",
      rating:       5,
      service_slug: "referencement-seo",
      city:         "Casablanca",
      featured:     true,
    },
  }).catch(() => { /* skip if duplicate */ });
  console.log("✅ Sample testimonial created");

  console.log("\n🎉 Seed complete!");
  console.log("   Login: admin@forge-scale.ma");
  console.log("   Password: admin1234");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
