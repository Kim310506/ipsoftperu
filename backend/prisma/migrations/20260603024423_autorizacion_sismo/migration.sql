-- CreateTable
CREATE TABLE `AutorizacionSismo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sedeId` INTEGER NOT NULL,
    `plano` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PENDIENTE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AutorizacionSismo_sedeId_key`(`sedeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AutorizacionSismo` ADD CONSTRAINT `AutorizacionSismo_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
