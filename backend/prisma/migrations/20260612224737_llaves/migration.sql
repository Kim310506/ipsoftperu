/*
  Warnings:

  - You are about to drop the column `estado` on the `llave` table. All the data in the column will be lost.
  - You are about to drop the `prestamollave` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `llaveroId` on table `llave` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `llave` DROP FOREIGN KEY `Llave_llaveroId_fkey`;

-- DropForeignKey
ALTER TABLE `prestamollave` DROP FOREIGN KEY `PrestamoLlave_llaveId_fkey`;

-- DropIndex
DROP INDEX `Llave_llaveroId_fkey` ON `llave`;

-- AlterTable
ALTER TABLE `llave` DROP COLUMN `estado`,
    MODIFY `llaveroId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `llavero` MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'DISPONIBLE';

-- DropTable
DROP TABLE `prestamollave`;

-- CreateTable
CREATE TABLE `PrestamoLlavero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `llaveroId` INTEGER NOT NULL,
    `responsableNombre` VARCHAR(191) NOT NULL,
    `responsableDni` VARCHAR(191) NOT NULL,
    `fechaEntrega` DATETIME(3) NOT NULL,
    `fechaDevolucion` DATETIME(3) NULL,
    `devueltoPor` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL,
    `detalle` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Llave` ADD CONSTRAINT `Llave_llaveroId_fkey` FOREIGN KEY (`llaveroId`) REFERENCES `Llavero`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestamoLlavero` ADD CONSTRAINT `PrestamoLlavero_llaveroId_fkey` FOREIGN KEY (`llaveroId`) REFERENCES `Llavero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
