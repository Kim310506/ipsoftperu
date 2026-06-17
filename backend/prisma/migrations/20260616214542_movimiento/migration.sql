/*
  Warnings:

  - You are about to drop the column `devueltoPor` on the `prestamollavero` table. All the data in the column will be lost.
  - Added the required column `tipoMovimiento` to the `PrestamoLlavero` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prestamollavero` DROP COLUMN `devueltoPor`,
    ADD COLUMN `proveedorDestino` VARCHAR(191) NULL,
    ADD COLUMN `proveedorOrigen` VARCHAR(191) NULL,
    ADD COLUMN `tipoMovimiento` VARCHAR(191) NOT NULL,
    MODIFY `responsableNombre` VARCHAR(191) NULL,
    MODIFY `responsableDni` VARCHAR(191) NULL,
    MODIFY `fechaEntrega` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
