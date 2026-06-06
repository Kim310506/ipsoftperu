-- CreateTable
CREATE TABLE `ResponsableRiesgo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidoPaterno` VARCHAR(191) NOT NULL,
    `apellidoMaterno` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegistroRiesgo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `sedeId` INTEGER NOT NULL,
    `pabellonId` INTEGER NOT NULL,
    `pisoId` INTEGER NOT NULL,
    `ambienteId` INTEGER NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `riesgo` VARCHAR(191) NOT NULL,
    `probabilidad` INTEGER NOT NULL,
    `impacto` INTEGER NOT NULL,
    `nivel` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PENDIENTE',
    `foto` VARCHAR(191) NULL,
    `responsableId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RegistroRiesgo_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TratamientoRiesgo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registroRiesgoId` INTEGER NOT NULL,
    `tipoTratamiento` VARCHAR(191) NOT NULL,
    `planAccion` VARCHAR(191) NOT NULL,
    `presupuesto` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'EN PROCESO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeguimientoRiesgo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registroRiesgoId` INTEGER NOT NULL,
    `comentario` VARCHAR(191) NOT NULL,
    `evidencia` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_pabellonId_fkey` FOREIGN KEY (`pabellonId`) REFERENCES `Pabellon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_pisoId_fkey` FOREIGN KEY (`pisoId`) REFERENCES `Piso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_responsableId_fkey` FOREIGN KEY (`responsableId`) REFERENCES `ResponsableRiesgo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TratamientoRiesgo` ADD CONSTRAINT `TratamientoRiesgo_registroRiesgoId_fkey` FOREIGN KEY (`registroRiesgoId`) REFERENCES `RegistroRiesgo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeguimientoRiesgo` ADD CONSTRAINT `SeguimientoRiesgo_registroRiesgoId_fkey` FOREIGN KEY (`registroRiesgoId`) REFERENCES `RegistroRiesgo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
