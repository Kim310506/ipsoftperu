-- CreateTable
CREATE TABLE `ContrataProveedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `sedeId` INTEGER NOT NULL,
    `pabellonId` INTEGER NOT NULL,
    `pisoId` INTEGER NOT NULL,
    `ambienteId` INTEGER NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `fechaInicio` DATE NOT NULL,
    `fechaFin` DATE NOT NULL,
    `horaEntrada` VARCHAR(191) NOT NULL,
    `horaSalida` VARCHAR(191) NOT NULL,
    `empresaContratista` VARCHAR(191) NOT NULL,
    `descripcionServicio` VARCHAR(191) NOT NULL,
    `emailResponsable` VARCHAR(191) NOT NULL,
    `dniResponsable` VARCHAR(191) NOT NULL,
    `nombresResponsable` VARCHAR(191) NOT NULL,
    `apellidoPaternoResponsable` VARCHAR(191) NOT NULL,
    `apellidoMaternoResponsable` VARCHAR(191) NOT NULL,
    `telefonoResponsable` VARCHAR(191) NOT NULL,
    `tokenAcceso` VARCHAR(191) NOT NULL,
    `nivelRiesgo` VARCHAR(191) NULL,
    `sctr` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PENDIENTE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ContrataProveedor_codigo_key`(`codigo`),
    UNIQUE INDEX `ContrataProveedor_tokenAcceso_key`(`tokenAcceso`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrabajadorContrata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidoPaterno` VARCHAR(191) NOT NULL,
    `apellidoMaterno` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contrataId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TrabajadorContrata_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ContrataProveedor` ADD CONSTRAINT `ContrataProveedor_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContrataProveedor` ADD CONSTRAINT `ContrataProveedor_pabellonId_fkey` FOREIGN KEY (`pabellonId`) REFERENCES `Pabellon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContrataProveedor` ADD CONSTRAINT `ContrataProveedor_pisoId_fkey` FOREIGN KEY (`pisoId`) REFERENCES `Piso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContrataProveedor` ADD CONSTRAINT `ContrataProveedor_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrabajadorContrata` ADD CONSTRAINT `TrabajadorContrata_contrataId_fkey` FOREIGN KEY (`contrataId`) REFERENCES `ContrataProveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
