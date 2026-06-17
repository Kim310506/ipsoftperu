/*
  Warnings:

  - You are about to drop the column `proveedorDestino` on the `prestamollavero` table. All the data in the column will be lost.
  - You are about to drop the column `proveedorOrigen` on the `prestamollavero` table. All the data in the column will be lost.
  - You are about to drop the column `responsableDni` on the `prestamollavero` table. All the data in the column will be lost.
  - You are about to drop the column `responsableNombre` on the `prestamollavero` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `prestamollavero` DROP COLUMN `proveedorDestino`,
    DROP COLUMN `proveedorOrigen`,
    DROP COLUMN `responsableDni`,
    DROP COLUMN `responsableNombre`,
    ADD COLUMN `contrataId` INTEGER NULL,
    ADD COLUMN `responsableId` INTEGER NULL;

-- CreateTable
CREATE TABLE `TransferenciaLlavero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prestamoId` INTEGER NOT NULL,
    `contrataOrigenId` INTEGER NOT NULL,
    `contrataDestinoId` INTEGER NOT NULL,
    `responsableId` INTEGER NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `detalle` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PrestamoLlavero` ADD CONSTRAINT `PrestamoLlavero_contrataId_fkey` FOREIGN KEY (`contrataId`) REFERENCES `ContrataProveedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestamoLlavero` ADD CONSTRAINT `PrestamoLlavero_responsableId_fkey` FOREIGN KEY (`responsableId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferenciaLlavero` ADD CONSTRAINT `TransferenciaLlavero_prestamoId_fkey` FOREIGN KEY (`prestamoId`) REFERENCES `PrestamoLlavero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferenciaLlavero` ADD CONSTRAINT `TransferenciaLlavero_contrataOrigenId_fkey` FOREIGN KEY (`contrataOrigenId`) REFERENCES `ContrataProveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferenciaLlavero` ADD CONSTRAINT `TransferenciaLlavero_contrataDestinoId_fkey` FOREIGN KEY (`contrataDestinoId`) REFERENCES `ContrataProveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferenciaLlavero` ADD CONSTRAINT `TransferenciaLlavero_responsableId_fkey` FOREIGN KEY (`responsableId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
