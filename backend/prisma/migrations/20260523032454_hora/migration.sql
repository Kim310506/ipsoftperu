/*
  Warnings:

  - You are about to alter the column `horaIngreso` on the `visitante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `horaSalida` on the `visitante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `visitante` MODIFY `horaIngreso` DATETIME(3) NULL,
    MODIFY `horaSalida` DATETIME(3) NULL;
