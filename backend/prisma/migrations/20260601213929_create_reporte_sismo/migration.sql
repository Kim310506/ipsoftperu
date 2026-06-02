-- CreateTable
CREATE TABLE `ReporteSismo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `fechaIncidente` DATETIME(3) NOT NULL,
    `horaIncidente` VARCHAR(191) NOT NULL,
    `fechaReporte` DATETIME(3) NOT NULL,
    `horaReporte` VARCHAR(191) NOT NULL,
    `responsableId` INTEGER NOT NULL,
    `sedeId` INTEGER NOT NULL,
    `operacion` BOOLEAN NOT NULL,
    `corteEnergia` BOOLEAN NOT NULL,
    `evacuaron` BOOLEAN NOT NULL,
    `tiempoEvacuacion` VARCHAR(191) NULL,
    `danios` BOOLEAN NOT NULL,
    `descripcionDanios` VARCHAR(191) NULL,
    `victimas` BOOLEAN NOT NULL,
    `cantidadVictimas` INTEGER NULL,
    `continuidad` BOOLEAN NOT NULL,
    `descripcionContinuidad` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'REPORTADO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ReporteSismo_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EvidenciaSismo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `reporteSismoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReporteSismo` ADD CONSTRAINT `ReporteSismo_responsableId_fkey` FOREIGN KEY (`responsableId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReporteSismo` ADD CONSTRAINT `ReporteSismo_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvidenciaSismo` ADD CONSTRAINT `EvidenciaSismo_reporteSismoId_fkey` FOREIGN KEY (`reporteSismoId`) REFERENCES `ReporteSismo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
