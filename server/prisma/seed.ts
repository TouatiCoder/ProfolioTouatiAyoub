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
      price_from:        "2500 MAD",
      badge:             "Populaire",
      icon:              "Globe",
      cta_label:         "Demander un devis",
      featured:          true,
      published:         true,
      sort_order:        1,
    },
  });

  await prisma.service.upsert({
    where:  { slug: "seo-referencement" },
    update: {},
    create: {
      slug:              "seo-referencement",
      name:              "SEO & Référencement",
      short_description: "Améliorez votre visibilité sur Google et attirez plus de clients.",
      price_from:        "1500 MAD/mois",
      badge:             "ROI garanti",
      icon:              "TrendingUp",
      cta_label:         "Audit gratuit",
      featured:          true,
      published:         true,
      sort_order:        2,
    },
  });

  await prisma.service.upsert({
    where:  { slug: "social-media" },
    update: {},
    create: {
      slug:              "social-media",
      name:              "Social Media Marketing",
      short_description: "Développez votre présence sur les réseaux sociaux au Maroc.",
      price_from:        "1200 MAD/mois",
      icon:              "Share2",
      published:         true,
      sort_order:        3,
    },
  });
  console.log("✅ Sample services created");

  // ─── Sample blog posts ───────────────────────────────────────────────────
  await prisma.blogPost.upsert({
    where:  { slug: "tendances-digital-maroc-2025" },
    update: {},
    create: {
      title:            "Les tendances du digital au Maroc en 2025",
      slug:             "tendances-digital-maroc-2025",
      excerpt:          "Découvrez les grandes tendances qui vont façonner le marketing digital marocain.",
      content:          "<p>Le marché digital marocain est en pleine expansion...</p>",
      meta_title:       "Tendances Digital Maroc 2025",
      meta_description: "Les grandes tendances du marketing digital au Maroc pour 2025.",
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
      service_slug: "seo-referencement",
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
