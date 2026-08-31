-- Stage 2 admin audit (Aug 2026) — purely additive, non-destructive migration.
-- No existing table is dropped, renamed, or has a column removed. No data is
-- deleted. New Testimonial columns are nullable or carry a default, so every
-- existing row remains valid and unchanged after this runs.
--
-- This project had no prisma/migrations history before this file (schema was
-- kept in sync via `prisma db push`). This migration was written by hand to
-- match exactly what `prisma migrate dev` would generate from the schema.prisma
-- diff — it has NOT been run against any database from this environment (no
-- production DATABASE_URL access here). Apply it with:
--   cd server && npx prisma migrate deploy
-- from a machine/CI that holds the real production DATABASE_URL.

-- AlterTable: add optional/defaulted columns to `testimonials`
ALTER TABLE `testimonials`
  ADD COLUMN `role` VARCHAR(191) NULL,
  ADD COLUMN `photo_url` VARCHAR(191) NULL,
  ADD COLUMN `review_date` DATETIME(3) NULL,
  ADD COLUMN `source` VARCHAR(191) NULL,
  ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN `sort_order` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `testimonials_published_idx` ON `testimonials`(`published`);

-- CreateTable: new `technologies` table (admin-editable Technology Stack)
CREATE TABLE `technologies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `technologies_slug_key`(`slug`),
    INDEX `technologies_published_idx`(`published`),
    INDEX `technologies_sort_order_idx`(`sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
