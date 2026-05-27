/*
  Warnings:

  - You are about to drop the column `autorizadoPorId` on the `visita` table. All the data in the column will be lost.
  - You are about to drop the column `canceladoPorId` on the `visita` table. All the data in the column will be lost.
  - You are about to drop the column `desautorizadoPorId` on the `visita` table. All the data in the column will be lost.
  - You are about to drop the column `fechaAutorizacion` on the `visita` table. All the data in the column will be lost.
  - You are about to drop the column `fechaCancelacion` on the `visita` table. All the data in the column will be lost.
  - You are about to drop the column `fechaDesautorizacion` on the `visita` table. All the data in the column will be lost.
  - You are about to drop the column `motivoCancelacion` on the `visita` table. All the data in the column will be lost.
  - You are about to drop the column `motivoDesautorizacion` on the `visita` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `visita` DROP FOREIGN KEY `Visita_autorizadoPorId_fkey`;

-- DropForeignKey
ALTER TABLE `visita` DROP FOREIGN KEY `Visita_canceladoPorId_fkey`;

-- DropForeignKey
ALTER TABLE `visita` DROP FOREIGN KEY `Visita_desautorizadoPorId_fkey`;

-- DropIndex
DROP INDEX `Visita_autorizadoPorId_fkey` ON `visita`;

-- DropIndex
DROP INDEX `Visita_canceladoPorId_fkey` ON `visita`;

-- DropIndex
DROP INDEX `Visita_desautorizadoPorId_fkey` ON `visita`;

-- AlterTable
ALTER TABLE `visita` DROP COLUMN `autorizadoPorId`,
    DROP COLUMN `canceladoPorId`,
    DROP COLUMN `desautorizadoPorId`,
    DROP COLUMN `fechaAutorizacion`,
    DROP COLUMN `fechaCancelacion`,
    DROP COLUMN `fechaDesautorizacion`,
    DROP COLUMN `motivoCancelacion`,
    DROP COLUMN `motivoDesautorizacion`,
    ADD COLUMN `accionPorId` INTEGER NULL,
    ADD COLUMN `fechaAccion` DATETIME(3) NULL,
    ADD COLUMN `motivoAccion` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Visita` ADD CONSTRAINT `Visita_accionPorId_fkey` FOREIGN KEY (`accionPorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
