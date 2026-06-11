/*
  Warnings:

  - You are about to drop the column `accionPorId` on the `contrataproveedor` table. All the data in the column will be lost.
  - You are about to drop the column `fechaAccion` on the `contrataproveedor` table. All the data in the column will be lost.
  - You are about to drop the column `motivoAccion` on the `contrataproveedor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `contrataproveedor` DROP FOREIGN KEY `ContrataProveedor_accionPorId_fkey`;

-- DropIndex
DROP INDEX `ContrataProveedor_accionPorId_fkey` ON `contrataproveedor`;

-- AlterTable
ALTER TABLE `contrataproveedor` DROP COLUMN `accionPorId`,
    DROP COLUMN `fechaAccion`,
    DROP COLUMN `motivoAccion`,
    ADD COLUMN `aprobadoAmbientePorId` INTEGER NULL,
    ADD COLUMN `aprobadoSeguridadPorId` INTEGER NULL,
    ADD COLUMN `fechaAprobacionAmbiente` DATETIME(3) NULL,
    ADD COLUMN `fechaAprobacionSeguridad` DATETIME(3) NULL,
    ADD COLUMN `motivoRechazo` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ContrataProveedor` ADD CONSTRAINT `ContrataProveedor_aprobadoSeguridadPorId_fkey` FOREIGN KEY (`aprobadoSeguridadPorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContrataProveedor` ADD CONSTRAINT `ContrataProveedor_aprobadoAmbientePorId_fkey` FOREIGN KEY (`aprobadoAmbientePorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
