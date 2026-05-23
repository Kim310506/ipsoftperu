/*
  Warnings:

  - You are about to drop the column `fecha` on the `visita` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `visita` DROP COLUMN `fecha`,
    ADD COLUMN `fechaFin` DATETIME(3) NULL,
    ADD COLUMN `fechaInicio` DATETIME(3) NULL,
    MODIFY `horaEntrada` VARCHAR(191) NULL,
    MODIFY `horaSalida` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `visitante` ADD COLUMN `cargo` VARCHAR(191) NULL,
    ADD COLUMN `horaIngreso` VARCHAR(191) NULL,
    ADD COLUMN `horaSalida` VARCHAR(191) NULL;
