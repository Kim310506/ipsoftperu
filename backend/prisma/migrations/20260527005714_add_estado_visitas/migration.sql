-- AlterTable
ALTER TABLE `visita` ADD COLUMN `canceladoPorId` INTEGER NULL,
    ADD COLUMN `desautorizadoPorId` INTEGER NULL,
    ADD COLUMN `fechaAutorizacion` DATETIME(3) NULL,
    ADD COLUMN `fechaCancelacion` DATETIME(3) NULL,
    ADD COLUMN `fechaDesautorizacion` DATETIME(3) NULL,
    ADD COLUMN `motivoCancelacion` VARCHAR(191) NULL,
    ADD COLUMN `motivoDesautorizacion` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Visita` ADD CONSTRAINT `Visita_desautorizadoPorId_fkey` FOREIGN KEY (`desautorizadoPorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visita` ADD CONSTRAINT `Visita_canceladoPorId_fkey` FOREIGN KEY (`canceladoPorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
