-- AddForeignKey
ALTER TABLE `ContactoExterno` ADD CONSTRAINT `ContactoExterno_visitaId_fkey` FOREIGN KEY (`visitaId`) REFERENCES `Visita`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
