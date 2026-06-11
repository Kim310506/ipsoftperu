/*
  Warnings:

  - You are about to drop the column `sctr` on the `contrataproveedor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contrataproveedor` DROP COLUMN `sctr`;

-- CreateTable
CREATE TABLE `DocumentoContrata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contrataId` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `archivo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DocumentoContrata` ADD CONSTRAINT `DocumentoContrata_contrataId_fkey` FOREIGN KEY (`contrataId`) REFERENCES `ContrataProveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
