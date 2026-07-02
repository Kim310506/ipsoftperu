/*
  Warnings:

  - Added the required column `tipoContrata` to the `PrestamoLlavero` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoResponsableDevolucion` to the `PrestamoLlavero` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoResponsableEntrega` to the `PrestamoLlavero` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoDestino` to the `TransferenciaLlavero` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoOrigen` to the `TransferenciaLlavero` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoResponsable` to the `TransferenciaLlavero` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `prestamollavero` DROP FOREIGN KEY `PrestamoLlavero_contrataId_fkey`;

-- DropForeignKey
ALTER TABLE `prestamollavero` DROP FOREIGN KEY `PrestamoLlavero_responsableDevolucionId_fkey`;

-- DropForeignKey
ALTER TABLE `prestamollavero` DROP FOREIGN KEY `PrestamoLlavero_responsableEntregaId_fkey`;

-- DropForeignKey
ALTER TABLE `transferenciallavero` DROP FOREIGN KEY `TransferenciaLlavero_contrataDestinoId_fkey`;

-- DropForeignKey
ALTER TABLE `transferenciallavero` DROP FOREIGN KEY `TransferenciaLlavero_contrataOrigenId_fkey`;

-- DropForeignKey
ALTER TABLE `transferenciallavero` DROP FOREIGN KEY `TransferenciaLlavero_responsableId_fkey`;

-- DropIndex
DROP INDEX `PrestamoLlavero_contrataId_fkey` ON `prestamollavero`;

-- DropIndex
DROP INDEX `PrestamoLlavero_responsableDevolucionId_fkey` ON `prestamollavero`;

-- DropIndex
DROP INDEX `PrestamoLlavero_responsableEntregaId_fkey` ON `prestamollavero`;

-- DropIndex
DROP INDEX `TransferenciaLlavero_contrataDestinoId_fkey` ON `transferenciallavero`;

-- DropIndex
DROP INDEX `TransferenciaLlavero_contrataOrigenId_fkey` ON `transferenciallavero`;

-- DropIndex
DROP INDEX `TransferenciaLlavero_responsableId_fkey` ON `transferenciallavero`;

-- DropIndex
DROP INDEX `User_correo_key` ON `user`;

-- AlterTable
ALTER TABLE `prestamollavero` ADD COLUMN `tipoContrata` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoResponsableDevolucion` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoResponsableEntrega` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transferenciallavero` ADD COLUMN `tipoDestino` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoOrigen` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoResponsable` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ContrataProveedorInhouse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `sedeId` INTEGER NOT NULL,
    `ambienteId` INTEGER NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `empresaContratista` VARCHAR(191) NOT NULL,
    `descripcionServicio` VARCHAR(191) NOT NULL,
    `fechaInicio` DATE NOT NULL,
    `fechaFin` DATE NOT NULL,
    `horaEntrada` VARCHAR(191) NOT NULL,
    `horaSalida` VARCHAR(191) NOT NULL,
    `emailResponsable` VARCHAR(191) NOT NULL,
    `dniResponsable` VARCHAR(191) NOT NULL,
    `nombresResponsable` VARCHAR(191) NOT NULL,
    `apellidoPaternoResponsable` VARCHAR(191) NOT NULL,
    `apellidoMaternoResponsable` VARCHAR(191) NOT NULL,
    `telefonoResponsable` VARCHAR(191) NOT NULL,
    `tokenAcceso` VARCHAR(191) NOT NULL,
    `nivelRiesgo` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PENDIENTE',
    `aprobadoSeguridadPorId` INTEGER NULL,
    `fechaAprobacionSeguridad` DATETIME(3) NULL,
    `aprobadoAmbientePorId` INTEGER NULL,
    `fechaAprobacionAmbiente` DATETIME(3) NULL,
    `motivoRechazo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ContrataProveedorInhouse_codigo_key`(`codigo`),
    UNIQUE INDEX `ContrataProveedorInhouse_tokenAcceso_key`(`tokenAcceso`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrabajadorContrataInhouse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidoPaterno` VARCHAR(191) NOT NULL,
    `apellidoMaterno` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `horaIngreso` VARCHAR(191) NULL,
    `horaSalida` VARCHAR(191) NULL,
    `qrData` VARCHAR(191) NULL,
    `estadoQr` VARCHAR(191) NULL,
    `contrataId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TrabajadorContrataInhouse_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentoContrataInhouse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contrataId` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `archivo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ContrataProveedorInhouse` ADD CONSTRAINT `ContrataProveedorInhouse_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContrataProveedorInhouse` ADD CONSTRAINT `ContrataProveedorInhouse_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContrataProveedorInhouse` ADD CONSTRAINT `ContrataProveedorInhouse_aprobadoSeguridadPorId_fkey` FOREIGN KEY (`aprobadoSeguridadPorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContrataProveedorInhouse` ADD CONSTRAINT `ContrataProveedorInhouse_aprobadoAmbientePorId_fkey` FOREIGN KEY (`aprobadoAmbientePorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrabajadorContrataInhouse` ADD CONSTRAINT `TrabajadorContrataInhouse_contrataId_fkey` FOREIGN KEY (`contrataId`) REFERENCES `ContrataProveedorInhouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentoContrataInhouse` ADD CONSTRAINT `DocumentoContrataInhouse_contrataId_fkey` FOREIGN KEY (`contrataId`) REFERENCES `ContrataProveedorInhouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
