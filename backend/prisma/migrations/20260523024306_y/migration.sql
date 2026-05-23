/*
  Warnings:

  - Made the column `fechaFin` on table `visita` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicio` on table `visita` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `visita` MODIFY `fechaFin` DATE NOT NULL,
    MODIFY `fechaInicio` DATE NOT NULL;
