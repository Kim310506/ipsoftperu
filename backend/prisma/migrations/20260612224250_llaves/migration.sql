-- CreateTable
CREATE TABLE `Llavero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVO',
    `createdById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Llavero_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Llave` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'DISPONIBLE',
    `ambienteId` INTEGER NOT NULL,
    `llaveroId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Llave_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrestamoLlave` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `llaveId` INTEGER NOT NULL,
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
ALTER TABLE `Llavero` ADD CONSTRAINT `Llavero_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Llave` ADD CONSTRAINT `Llave_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Llave` ADD CONSTRAINT `Llave_llaveroId_fkey` FOREIGN KEY (`llaveroId`) REFERENCES `Llavero`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestamoLlave` ADD CONSTRAINT `PrestamoLlave_llaveId_fkey` FOREIGN KEY (`llaveId`) REFERENCES `Llave`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
