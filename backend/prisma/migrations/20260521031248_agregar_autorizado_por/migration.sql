/*
  Warnings:

  - You are about to drop the column `autorizado` on the `visita` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `visita` DROP COLUMN `autorizado`,
    ADD COLUMN `autorizadoPorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Visita` ADD CONSTRAINT `Visita_autorizadoPorId_fkey` FOREIGN KEY (`autorizadoPorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
