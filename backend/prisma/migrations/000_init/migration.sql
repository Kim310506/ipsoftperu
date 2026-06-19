-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL,
    `modulo` VARCHAR(191) NOT NULL,
    `sedeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `proveedorId` INTEGER NULL,

    UNIQUE INDEX `User_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnidadNegocio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnidadNegocioZonal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unidadNegocioId` INTEGER NOT NULL,
    `zonalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zonal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sede` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `zonalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pabellon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `sedeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Piso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `pabellonId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ambiente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `pisoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `sistema` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NULL,
    `modelo` VARCHAR(191) NULL,
    `serie` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVO',
    `estadoInv` VARCHAR(191) NOT NULL DEFAULT 'ALTA',
    `observaciones` TEXT NULL,
    `foto` VARCHAR(191) NULL,
    `proveedorId` INTEGER NULL,
    `ambienteId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Activo_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proveedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `contacto` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleExtintor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activoId` INTEGER NOT NULL,
    `capacidad` VARCHAR(191) NULL,
    `agente` VARCHAR(191) NULL,
    `numInterno` INTEGER NULL,
    `fabricacion` INTEGER NULL,
    `fechaUltimaRecarga` DATETIME(3) NULL,
    `fechaUltimoMantenimiento` DATETIME(3) NULL,
    `fechaUltimaPH` DATETIME(3) NULL,
    `proximoServicioTipo` VARCHAR(191) NULL,
    `proximoServicioFecha` DATETIME(3) NULL,
    `vencimientoPH` DATETIME(3) NULL,

    UNIQUE INDEX `DetalleExtintor_activoId_key`(`activoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialServicio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activoId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialBaja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activoId` INTEGER NOT NULL,
    `motivoBaja` VARCHAR(191) NOT NULL,
    `observacionesBaja` TEXT NULL,
    `fotoBaja` VARCHAR(191) NULL,
    `usuarioId` INTEGER NULL,
    `fechaBaja` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `fechaInicio` DATE NOT NULL,
    `fechaFin` DATE NOT NULL,
    `horaEntrada` VARCHAR(191) NULL,
    `horaSalida` VARCHAR(191) NULL,
    `accionPorId` INTEGER NULL,
    `motivoAccion` VARCHAR(191) NULL,
    `fechaAccion` DATETIME(3) NULL,
    `sedeId` INTEGER NOT NULL,
    `ambienteId` INTEGER NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Visita_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visitante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidoPaterno` VARCHAR(191) NOT NULL,
    `apellidoMaterno` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `empresa` VARCHAR(191) NULL,
    `qrData` VARCHAR(191) NULL,
    `estadoQr` VARCHAR(191) NOT NULL,
    `horaIngreso` VARCHAR(191) NULL,
    `horaSalida` VARCHAR(191) NULL,
    `visitaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactoExterno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NULL,
    `visitaId` INTEGER NOT NULL,

    INDEX `ContactoExterno_visitaId_idx`(`visitaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ocurrencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `subcategoria` VARCHAR(191) NOT NULL,
    `detalle` VARCHAR(191) NOT NULL,
    `motivo` VARCHAR(191) NULL,
    `vinculo` VARCHAR(191) NULL,
    `personaInvolucrada` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL,
    `prioridad` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioId` INTEGER NOT NULL,
    `sedeId` INTEGER NOT NULL,
    `ambienteId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Ocurrencia_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialOcurrencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `mensaje` VARCHAR(191) NOT NULL,
    `estadoAnterior` VARCHAR(191) NULL,
    `estadoNuevo` VARCHAR(191) NULL,
    `usuarioId` INTEGER NOT NULL,
    `ocurrenciaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EvidenciaHistorial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `historialId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EvidenciaOcurrencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `ocurrenciaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `AutorizacionSismo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sedeId` INTEGER NOT NULL,
    `plano` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PENDIENTE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AutorizacionSismo_sedeId_key`(`sedeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResponsableRiesgo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidoPaterno` VARCHAR(191) NOT NULL,
    `apellidoMaterno` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegistroRiesgo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `sedeId` INTEGER NOT NULL,
    `pabellonId` INTEGER NOT NULL,
    `pisoId` INTEGER NOT NULL,
    `ambienteId` INTEGER NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `riesgo` VARCHAR(191) NOT NULL,
    `probabilidad` INTEGER NOT NULL,
    `impacto` INTEGER NOT NULL,
    `nivel` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PENDIENTE',
    `foto` VARCHAR(191) NULL,
    `historialBajaId` INTEGER NULL,
    `responsableId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RegistroRiesgo_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TratamientoRiesgo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registroRiesgoId` INTEGER NOT NULL,
    `tipoTratamiento` VARCHAR(191) NOT NULL,
    `planAccion` VARCHAR(191) NOT NULL,
    `presupuesto` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'EN PROCESO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeguimientoRiesgo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registroRiesgoId` INTEGER NOT NULL,
    `comentario` VARCHAR(191) NOT NULL,
    `evidencia` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContrataProveedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `sedeId` INTEGER NOT NULL,
    `ambienteId` INTEGER NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `empresaContratista` VARCHAR(191) NOT NULL,
    `descripcionServicio` VARCHAR(191) NOT NULL,
    `fechaInicio` DATE NOT NULL,
    `fechaFin` DATE NOT NULL,
    `horaEntrada` VARCHAR(191) NOT NULL,
    `horaSalida` VARCHAR(191) NOT NULL,
    `emailResponsable` VARCHAR(191) NOT NULL,
    `dniResponsable` VARCHAR(191) NOT NULL,
    `nombresResponsable` VARCHAR(191) NOT NULL,
    `apellidoPaternoResponsable` VARCHAR(191) NOT NULL,
    `apellidoMaternoResponsable` VARCHAR(191) NOT NULL,
    `telefonoResponsable` VARCHAR(191) NOT NULL,
    `tokenAcceso` VARCHAR(191) NOT NULL,
    `nivelRiesgo` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PENDIENTE',
    `aprobadoSeguridadPorId` INTEGER NULL,
    `fechaAprobacionSeguridad` DATETIME(3) NULL,
    `aprobadoAmbientePorId` INTEGER NULL,
    `fechaAprobacionAmbiente` DATETIME(3) NULL,
    `motivoRechazo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ContrataProveedor_codigo_key`(`codigo`),
    UNIQUE INDEX `ContrataProveedor_tokenAcceso_key`(`tokenAcceso`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrabajadorContrata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidoPaterno` VARCHAR(191) NOT NULL,
    `apellidoMaterno` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `horaIngreso` VARCHAR(191) NULL,
    `horaSalida` VARCHAR(191) NULL,
    `qrData` VARCHAR(191) NULL,
    `estadoQr` VARCHAR(191) NULL,
    `contrataId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TrabajadorContrata_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentoContrata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contrataId` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `archivo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Llavero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `tipoAgrupacion` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'DISPONIBLE',
    `createdById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Llavero_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Llave` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `ambienteId` INTEGER NOT NULL,
    `llaveroId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Llave_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrestamoLlavero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `llaveroId` INTEGER NOT NULL,
    `contrataId` INTEGER NULL,
    `tipoMovimiento` VARCHAR(191) NOT NULL,
    `responsableEntregaId` INTEGER NULL,
    `responsableDevolucionId` INTEGER NULL,
    `fechaEntrega` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaDevolucion` DATETIME(3) NULL,
    `estado` VARCHAR(191) NOT NULL,
    `detalle` VARCHAR(191) NULL,
    `fotoEntrega` VARCHAR(191) NULL,
    `fotoDevolucion` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransferenciaLlavero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prestamoId` INTEGER NOT NULL,
    `contrataOrigenId` INTEGER NOT NULL,
    `contrataDestinoId` INTEGER NOT NULL,
    `responsableId` INTEGER NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `detalle` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_proveedorId_fkey` FOREIGN KEY (`proveedorId`) REFERENCES `Proveedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnidadNegocioZonal` ADD CONSTRAINT `UnidadNegocioZonal_unidadNegocioId_fkey` FOREIGN KEY (`unidadNegocioId`) REFERENCES `UnidadNegocio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnidadNegocioZonal` ADD CONSTRAINT `UnidadNegocioZonal_zonalId_fkey` FOREIGN KEY (`zonalId`) REFERENCES `Zonal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sede` ADD CONSTRAINT `Sede_zonalId_fkey` FOREIGN KEY (`zonalId`) REFERENCES `Zonal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pabellon` ADD CONSTRAINT `Pabellon_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Piso` ADD CONSTRAINT `Piso_pabellonId_fkey` FOREIGN KEY (`pabellonId`) REFERENCES `Pabellon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ambiente` ADD CONSTRAINT `Ambiente_pisoId_fkey` FOREIGN KEY (`pisoId`) REFERENCES `Piso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activo` ADD CONSTRAINT `Activo_proveedorId_fkey` FOREIGN KEY (`proveedorId`) REFERENCES `Proveedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activo` ADD CONSTRAINT `Activo_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleExtintor` ADD CONSTRAINT `DetalleExtintor_activoId_fkey` FOREIGN KEY (`activoId`) REFERENCES `Activo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialServicio` ADD CONSTRAINT `HistorialServicio_activoId_fkey` FOREIGN KEY (`activoId`) REFERENCES `Activo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialServicio` ADD CONSTRAINT `HistorialServicio_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialBaja` ADD CONSTRAINT `HistorialBaja_activoId_fkey` FOREIGN KEY (`activoId`) REFERENCES `Activo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialBaja` ADD CONSTRAINT `HistorialBaja_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visita` ADD CONSTRAINT `Visita_accionPorId_fkey` FOREIGN KEY (`accionPorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visita` ADD CONSTRAINT `Visita_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visita` ADD CONSTRAINT `Visita_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visitante` ADD CONSTRAINT `Visitante_visitaId_fkey` FOREIGN KEY (`visitaId`) REFERENCES `Visita`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactoExterno` ADD CONSTRAINT `ContactoExterno_visitaId_fkey` FOREIGN KEY (`visitaId`) REFERENCES `Visita`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocurrencia` ADD CONSTRAINT `Ocurrencia_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocurrencia` ADD CONSTRAINT `Ocurrencia_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocurrencia` ADD CONSTRAINT `Ocurrencia_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialOcurrencia` ADD CONSTRAINT `HistorialOcurrencia_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialOcurrencia` ADD CONSTRAINT `HistorialOcurrencia_ocurrenciaId_fkey` FOREIGN KEY (`ocurrenciaId`) REFERENCES `Ocurrencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvidenciaHistorial` ADD CONSTRAINT `EvidenciaHistorial_historialId_fkey` FOREIGN KEY (`historialId`) REFERENCES `HistorialOcurrencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvidenciaOcurrencia` ADD CONSTRAINT `EvidenciaOcurrencia_ocurrenciaId_fkey` FOREIGN KEY (`ocurrenciaId`) REFERENCES `Ocurrencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReporteSismo` ADD CONSTRAINT `ReporteSismo_responsableId_fkey` FOREIGN KEY (`responsableId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReporteSismo` ADD CONSTRAINT `ReporteSismo_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvidenciaSismo` ADD CONSTRAINT `EvidenciaSismo_reporteSismoId_fkey` FOREIGN KEY (`reporteSismoId`) REFERENCES `ReporteSismo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AutorizacionSismo` ADD CONSTRAINT `AutorizacionSismo_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_pabellonId_fkey` FOREIGN KEY (`pabellonId`) REFERENCES `Pabellon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_pisoId_fkey` FOREIGN KEY (`pisoId`) REFERENCES `Piso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_historialBajaId_fkey` FOREIGN KEY (`historialBajaId`) REFERENCES `HistorialBaja`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroRiesgo` ADD CONSTRAINT `RegistroRiesgo_responsableId_fkey` FOREIGN KEY (`responsableId`) REFERENCES `ResponsableRiesgo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TratamientoRiesgo` ADD CONSTRAINT `TratamientoRiesgo_registroRiesgoId_fkey` FOREIGN KEY (`registroRiesgoId`) REFERENCES `RegistroRiesgo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeguimientoRiesgo` ADD CONSTRAINT `SeguimientoRiesgo_registroRiesgoId_fkey` FOREIGN KEY (`registroRiesgoId`) REFERENCES `RegistroRiesgo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContrataProveedor` ADD CONSTRAINT `ContrataProveedor_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `Sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContrataProveedor` ADD CONSTRAINT `ContrataProveedor_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContrataProveedor` ADD CONSTRAINT `ContrataProveedor_aprobadoSeguridadPorId_fkey` FOREIGN KEY (`aprobadoSeguridadPorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContrataProveedor` ADD CONSTRAINT `ContrataProveedor_aprobadoAmbientePorId_fkey` FOREIGN KEY (`aprobadoAmbientePorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrabajadorContrata` ADD CONSTRAINT `TrabajadorContrata_contrataId_fkey` FOREIGN KEY (`contrataId`) REFERENCES `ContrataProveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentoContrata` ADD CONSTRAINT `DocumentoContrata_contrataId_fkey` FOREIGN KEY (`contrataId`) REFERENCES `ContrataProveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Llavero` ADD CONSTRAINT `Llavero_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Llave` ADD CONSTRAINT `Llave_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Llave` ADD CONSTRAINT `Llave_llaveroId_fkey` FOREIGN KEY (`llaveroId`) REFERENCES `Llavero`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestamoLlavero` ADD CONSTRAINT `PrestamoLlavero_llaveroId_fkey` FOREIGN KEY (`llaveroId`) REFERENCES `Llavero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestamoLlavero` ADD CONSTRAINT `PrestamoLlavero_contrataId_fkey` FOREIGN KEY (`contrataId`) REFERENCES `ContrataProveedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestamoLlavero` ADD CONSTRAINT `PrestamoLlavero_responsableEntregaId_fkey` FOREIGN KEY (`responsableEntregaId`) REFERENCES `TrabajadorContrata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestamoLlavero` ADD CONSTRAINT `PrestamoLlavero_responsableDevolucionId_fkey` FOREIGN KEY (`responsableDevolucionId`) REFERENCES `TrabajadorContrata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferenciaLlavero` ADD CONSTRAINT `TransferenciaLlavero_prestamoId_fkey` FOREIGN KEY (`prestamoId`) REFERENCES `PrestamoLlavero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferenciaLlavero` ADD CONSTRAINT `TransferenciaLlavero_contrataOrigenId_fkey` FOREIGN KEY (`contrataOrigenId`) REFERENCES `ContrataProveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferenciaLlavero` ADD CONSTRAINT `TransferenciaLlavero_contrataDestinoId_fkey` FOREIGN KEY (`contrataDestinoId`) REFERENCES `ContrataProveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferenciaLlavero` ADD CONSTRAINT `TransferenciaLlavero_responsableId_fkey` FOREIGN KEY (`responsableId`) REFERENCES `TrabajadorContrata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

