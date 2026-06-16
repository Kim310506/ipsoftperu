/*
  Warnings:

  - Added the required column `tipoAgrupacion` to the `Llavero` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `llavero` ADD COLUMN `tipoAgrupacion` VARCHAR(191) NOT NULL;
