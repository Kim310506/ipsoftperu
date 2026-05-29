-- CreateTable
CREATE TABLE `Ocurrencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `subcategoria` VARCHAR(191) NOT NULL,
    `detalle` VARCHAR(191) NOT NULL,
    `motivo` VARCHAR(191) NULL,
    `vinculo` VARCHAR(191) NULL,
    `personaInvolucrada` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL,
    `prioridad` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioId` INTEGER NOT NULL,
    `sedeId` INTEGER NOT NULL,
    `ambienteId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Ocurrencia_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialOcurrencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `mensaje` VARCHAR(191) NOT NULL,
    `estadoAnterior` VARCHAR(191) NULL,
    `estadoNuevo` VARCHAR(191) NULL,
    `usuarioId` INTEGER NOT NULL,
    `ocurrenciaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EvidenciaHistorial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `historialId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ocurrencia` ADD CONSTRAINT `Ocurrencia_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocurrencia` ADD CONSTRAINT `Ocurrencia_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocurrencia` ADD CONSTRAINT `Ocurrencia_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialOcurrencia` ADD CONSTRAINT `HistorialOcurrencia_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialOcurrencia` ADD CONSTRAINT `HistorialOcurrencia_ocurrenciaId_fkey` FOREIGN KEY (`ocurrenciaId`) REFERENCES `Ocurrencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvidenciaHistorial` ADD CONSTRAINT `EvidenciaHistorial_historialId_fkey` FOREIGN KEY (`historialId`) REFERENCES `HistorialOcurrencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
