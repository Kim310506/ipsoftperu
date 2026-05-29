-- CreateTable
CREATE TABLE `EvidenciaOcurrencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `ocurrenciaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EvidenciaOcurrencia` ADD CONSTRAINT `EvidenciaOcurrencia_ocurrenciaId_fkey` FOREIGN KEY (`ocurrenciaId`) REFERENCES `Ocurrencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
