/*
  Warnings:

  - You are about to drop the column `fotoDevolucion` on the `llavero` table. All the data in the column will be lost.
  - You are about to drop the column `fotoEntrega` on the `llavero` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `llavero` DROP COLUMN `fotoDevolucion`,
    DROP COLUMN `fotoEntrega`;

-- AlterTable
ALTER TABLE `prestamollavero` ADD COLUMN `fotoDevolucion` VARCHAR(191) NULL,
    ADD COLUMN `fotoEntrega` VARCHAR(191) NULL;
