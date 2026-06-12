/*
  Warnings:

  - You are about to drop the column `pabellonId` on the `contrataproveedor` table. All the data in the column will be lost.
  - You are about to drop the column `pisoId` on the `contrataproveedor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `contrataproveedor` DROP FOREIGN KEY `ContrataProveedor_pabellonId_fkey`;

-- DropForeignKey
ALTER TABLE `contrataproveedor` DROP FOREIGN KEY `ContrataProveedor_pisoId_fkey`;

-- DropIndex
DROP INDEX `ContrataProveedor_pabellonId_fkey` ON `contrataproveedor`;

-- DropIndex
DROP INDEX `ContrataProveedor_pisoId_fkey` ON `contrataproveedor`;

-- AlterTable
ALTER TABLE `contrataproveedor` DROP COLUMN `pabellonId`,
    DROP COLUMN `pisoId`;
