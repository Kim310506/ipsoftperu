-- AlterTable
ALTER TABLE `contrataproveedor` ADD COLUMN `accionPorId` INTEGER NULL,
    ADD COLUMN `fechaAccion` DATETIME(3) NULL,
    ADD COLUMN `motivoAccion` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ContrataProveedor` ADD CONSTRAINT `ContrataProveedor_accionPorId_fkey` FOREIGN KEY (`accionPorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
