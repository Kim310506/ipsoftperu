-- CreateTable
CREATE TABLE `ContactoExterno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NULL,
    `token` VARCHAR(191) NOT NULL,
    `visitaId` INTEGER NOT NULL,

    UNIQUE INDEX `ContactoExterno_token_key`(`token`),
    INDEX `ContactoExterno_visitaId_idx`(`visitaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
