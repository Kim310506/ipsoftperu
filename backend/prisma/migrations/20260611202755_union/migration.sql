/*
  Warnings:

  - You are about to drop the column `fechaVencimiento` on the `detalleextintor` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `detalleextintor` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `historialbaja` table. All the data in the column will be lost.
  - You are about to drop the column `motivo` on the `historialbaja` table. All the data in the column will be lost.
  - Added the required column `motivoBaja` to the `HistorialBaja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HistorialBaja` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `historialbaja` DROP FOREIGN KEY `HistorialBaja_activoId_fkey`;

-- DropForeignKey
ALTER TABLE `historialbaja` DROP FOREIGN KEY `HistorialBaja_usuarioId_fkey`;

-- DropIndex
DROP INDEX `HistorialBaja_activoId_fkey` ON `historialbaja`;

-- DropIndex
DROP INDEX `HistorialBaja_usuarioId_fkey` ON `historialbaja`;

-- AlterTable
ALTER TABLE `detalleextintor` DROP COLUMN `fechaVencimiento`,
    DROP COLUMN `tipo`,
    ADD COLUMN `agente` VARCHAR(191) NULL,
    ADD COLUMN `capacidad` VARCHAR(191) NULL,
    ADD COLUMN `fabricacion` INTEGER NULL,
    ADD COLUMN `fechaUltimaPH` DATETIME(3) NULL,
    ADD COLUMN `fechaUltimaRecarga` DATETIME(3) NULL,
    ADD COLUMN `fechaUltimoMantenimiento` DATETIME(3) NULL,
    ADD COLUMN `numInterno` INTEGER NULL,
    ADD COLUMN `proximoServicioFecha` DATETIME(3) NULL,
    ADD COLUMN `proximoServicioTipo` VARCHAR(191) NULL,
    ADD COLUMN `vencimientoPH` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `historialbaja` DROP COLUMN `fecha`,
    DROP COLUMN `motivo`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `fechaBaja` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `fotoBaja` VARCHAR(191) NULL,
    ADD COLUMN `motivoBaja` VARCHAR(191) NOT NULL,
    ADD COLUMN `observacionesBaja` TEXT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `usuarioId` INTEGER NULL;

-- AlterTable
ALTER TABLE `registroriesgo` ADD COLUMN `historialBajaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `HistorialBaja` ADD CONSTRAINT `HistorialBaja_activoId_fkey` FOREIGN KEY (`activoId`) REFERENCES `Activo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialBaja` ADD CONSTRAINT `HistorialBaja_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_historialBajaId_fkey` FOREIGN KEY (`historialBajaId`) REFERENCES `HistorialBaja`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
