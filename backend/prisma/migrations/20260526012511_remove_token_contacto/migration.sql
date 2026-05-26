/*
  Warnings:

  - You are about to drop the column `token` on the `contactoexterno` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `ContactoExterno_token_key` ON `contactoexterno`;

-- AlterTable
ALTER TABLE `contactoexterno` DROP COLUMN `token`;
