/*
  Warnings:

  - You are about to drop the column `responsableId` on the `prestamollavero` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `prestamollavero` DROP FOREIGN KEY `PrestamoLlavero_responsableId_fkey`;

-- DropIndex
DROP INDEX `PrestamoLlavero_responsableId_fkey` ON `prestamollavero`;

-- AlterTable
ALTER TABLE `prestamollavero` DROP COLUMN `responsableId`,
    ADD COLUMN `responsableDevolucionId` INTEGER NULL,
    ADD COLUMN `responsableEntregaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `PrestamoLlavero` ADD CONSTRAINT `PrestamoLlavero_responsableEntregaId_fkey` FOREIGN KEY (`responsableEntregaId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestamoLlavero` ADD CONSTRAINT `PrestamoLlavero_responsableDevolucionId_fkey` FOREIGN KEY (`responsableDevolucionId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
