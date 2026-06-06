import { Request, Response } from 'express';
import { Storage } from "@google-cloud/storage";
// import { prisma } from '../../../lib/prisma.js';
import { prisma } from '../../config/prisma';
import path from 'path';
import * as XLSX from 'xlsx';
import { enviarCorreoAlertaBaja, DatosBajaExtintor } from './services/mailer.service';

// --- FUNCIÓN PARA GENERAR EL CÓDIGO CORRELATIVO ---
const generarSiguienteCodigo = async (tx: any): Promise<string> => {
  const ultimoActivo = await tx.activo.findFirst({
    orderBy: { id: 'desc' },
    select: { codigo: true }
  });

  const prefijo = "IPS";
  let siguienteNumero = 1;

  if (ultimoActivo && ultimoActivo.codigo.startsWith(prefijo)) {
    const numeroActual = parseInt(ultimoActivo.codigo.replace(prefijo, ""), 10);
    siguienteNumero = numeroActual + 1;
  }

  const numeroFormateado = String(siguienteNumero).padStart(6, '0');
  return `${prefijo}${numeroFormateado}`;
};

// 🎯 ACTUALIZADO: Búsqueda jerarquía limpia (Solo desde Sede)
const buscarAmbienteId = async (tx: any, sedeNom: string, pabNom: string, pisoNom: string, ambNom: string) => {
  const ambiente = await tx.ambiente.findFirst({
    where: {
      nombre: ambNom,
      piso: {
        nombre: pisoNom,
        pabellon: {
          nombre: pabNom,
          sede: { 
            nombre: sedeNom
          }
        }
      }
    },
    select: { id: true }
  });
  return ambiente?.id || null;
};

// 🎯 ACTUALIZADO: Conexión local a GCP y al nuevo bucket
const storage = new Storage({
  projectId: "ips-global-sistema-php",
  keyFilename: "./src/config/gcloud-key.json" // 🔑 Nueva ruta y nombre
});

const bucket = storage.bucket("crm-ipsoft"); // 🪣 Tu nuevo bucket público

export const createActivo = async (req: Request, res: Response): Promise<void> => {
  // console.log("=== REVISANDO DATOS RECIBIDOS ===");
  // console.log("VALOR DE SISTEMA:", req.body.sistema);
  // console.log("VALOR DE DETALLE (PARSEADO):", req.body.detalle);
  // console.log("=================================");
  const { nombre, categoria, sistema, ambienteId, marca, modelo, serie, estadoInv, observaciones } = req.body;
  
  const archivo = req.file as Express.Multer.File | undefined;

  let detalle = null;
  if (req.body.detalle) {
    try {
      detalle = typeof req.body.detalle === 'string' 
        ? JSON.parse(req.body.detalle) 
        : req.body.detalle;
    } catch (e) {
      console.error("Error parseando detalle:", e);
      detalle = req.body.detalle;
    }
  }

  try {
    let urlImagen: string | null = null; 

    if (archivo) {
      const fileName = `activos/${Date.now()}-${archivo.originalname.replace(/\s+/g, '_')}`;
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({ resumable: false });

      await new Promise((resolve, reject) => {
        blobStream.on("error", (err) => reject(err));
        blobStream.on("finish", () => {
          urlImagen = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          resolve(urlImagen);
        });
        blobStream.end(archivo.buffer);
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const codigoAuto = await generarSiguienteCodigo(tx);

      const nuevoActivo = await tx.activo.create({
        data: {
          codigo: codigoAuto,
          nombre,
          categoria,
          sistema,
          marca: marca || null,
          modelo: modelo || null,
          serie: serie || null,
          estadoInv: estadoInv || 'ALTA',
          observaciones: observaciones || null,
          foto: urlImagen,
          ambienteId: Number(ambienteId)
        }
      });

      if (sistema === 'SISTEMA EXTINCIÓN MANUAL' && detalle) {
        let fRecarga: Date | null = null;
        let fMantenimiento: Date | null = null;
        let proximoTipo: string = "";

        const fechaServicioEntrada = new Date(detalle.fechaUltimoServicio);
        
        if (detalle.tipoUltimoServicio === 'RECARGA') {
          fRecarga = fechaServicioEntrada;
          proximoTipo = "MANTENIMIENTO";
        } else {
          fMantenimiento = fechaServicioEntrada;
          proximoTipo = "RECARGA";
        }

        const proximaFecha = new Date(fechaServicioEntrada);
        proximaFecha.setFullYear(proximaFecha.getFullYear() + 1);

        const fPH_Entrada = new Date(detalle.fechaUltimaPH);
        const vencimientoPH = new Date(fPH_Entrada);
        vencimientoPH.setFullYear(vencimientoPH.getFullYear() + 5);

        await tx.detalleExtintor.create({
          data: {
            activoId: nuevoActivo.id,
            numInterno: detalle.numInterno ? Number(detalle.numInterno) : null,
            fabricacion: detalle.fabricacion ? Number(detalle.fabricacion) : null,
            capacidad: detalle.capacidad || null,
            agente: null,
            fechaUltimaRecarga: fRecarga,
            fechaUltimoMantenimiento: fMantenimiento,
            fechaUltimaPH: fPH_Entrada,
            proximoServicioTipo: proximoTipo,
            proximoServicioFecha: proximaFecha,
            vencimientoPH: vencimientoPH
          }
        });
      }

      return nuevoActivo;
    });

    res.status(201).json({
      success: true,
      message: `Activo ${result.codigo} registrado con éxito`,
      data: result
    });

  } catch (error: any) {
    console.error("Error IPS:", error);
    res.status(500).json({
      success: false,
      error: "Error al procesar el registro",
      details: error.message
    });
  }
};

// 🎯 ACTUALIZADO: Consultas limpias hasta Sede
export const getActivos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const activos = await prisma.activo.findMany({
      include: {
        extintor: true,
        ambiente: {
          include: {
            piso: {
              include: {
                pabellon: {
                  include: { 
                    sede: true 
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const respuestaMapeada = activos.map(activo => {
      let detalleMapeado = null;

      if (activo.extintor) {
        const esRecarga = !!activo.extintor.fechaUltimaRecarga;
        const fechaBase = esRecarga 
          ? activo.extintor.fechaUltimaRecarga 
          : activo.extintor.fechaUltimoMantenimiento;

        detalleMapeado = {
          ...activo.extintor,
          tipoUltimoServicio: esRecarga ? 'RECARGA' : 'MANTENIMIENTO',
          fechaUltimoServicio: fechaBase ? fechaBase.toISOString().split('T')[0] : '',
          fechaUltimaPH: activo.extintor.fechaUltimaPH ? activo.extintor.fechaUltimaPH.toISOString().split('T')[0] : ''
        };
      }

      return {
        ...activo,
        detalle: detalleMapeado 
      };
    });

    res.json(respuestaMapeada);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEstadoActivo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado } = req.body; 

  try {
    const actualizado = await prisma.activo.update({
      where: { id: Number(id) },
      data: { estado },
      include: {
        extintor: true,
        ambiente: {
          include: {
            piso: {
              include: {
                pabellon: {
                  include: {
                    sede: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (estado === 'INACTIVO') {
      const datosCorreo: DatosBajaExtintor = {
          codigo: String(actualizado.codigo || 'S/C'),
          nombre: String(actualizado.nombre || 'Sin nombre'),
          marca: String(actualizado.marca || '---'),
          modelo: String(actualizado.modelo || '---'),
          serie: String(actualizado.serie || 'S/N'),
          numInterno: String(actualizado.extintor?.numInterno || '---'),
          observaciones: String(actualizado.observaciones || 'No se especificaron detalles.'),
          sede: String(actualizado.ambiente?.piso?.pabellon?.sede?.nombre || '---'),
          pabellon: String(actualizado.ambiente?.piso?.pabellon?.nombre || '---'),
          piso: String(actualizado.ambiente?.piso?.nombre || '---'),
          ambiente: String(actualizado.ambiente?.nombre || '---'),
      };

      enviarCorreoAlertaBaja(datosCorreo).catch(err => 
          console.error("❌ Error de envío de correo:", err)
      );
    }

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar estado e iniciar notificación" });
  }
};

export const darDeBajaActivo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { motivoBaja, observacionesBaja, usuarioId } = req.body;
  const archivo = req.file as Express.Multer.File | undefined;

  try {
    let fotoUrlBaja: string | null = null;

    if (archivo) {
      const nombreLimpio = archivo.originalname.replace(/\s+/g, '_');
      const fileName = `bajas/baja_${id}_${Date.now()}_${nombreLimpio}`;
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({ resumable: false });

      await new Promise((resolve, reject) => {
        blobStream.on("error", (err) => reject(err));
        blobStream.on("finish", () => {
          fotoUrlBaja = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          resolve(fotoUrlBaja);
        });
        blobStream.end(archivo.buffer);
      });
    }

    const resultado = await prisma.$transaction(async (tx) => {
      const activoActualizado = await tx.activo.update({
        where: { id: Number(id) },
        data: { estado: 'INACTIVO' },
        include: {
          extintor: true,
          ambiente: {
            include: {
              piso: {
                include: {
                  pabellon: {
                    include: {
                      sede: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      await tx.historialBaja.create({
        data: {
          activoId: Number(id),
          motivoBaja: motivoBaja || 'DAÑO IRREPARABLE',
          observacionesBaja: observacionesBaja || 'Sin observaciones',
          fotoBaja: fotoUrlBaja,
          usuarioId: usuarioId && !isNaN(Number(usuarioId)) ? Number(usuarioId) : null,
        }
      });

      return activoActualizado;
    });

    const datosCorreo = { // ❌ Le quitamos la interfaz de aquí
      codigo: String(resultado.codigo || 'S/C'),
      nombre: String(resultado.nombre || 'Sin nombre'),
      marca: String(resultado.marca || '---'),
      modelo: String(resultado.modelo || '---'),
      serie: String(resultado.serie || 'S/N'),
      numInterno: String(resultado.extintor?.numInterno || '---'),
      observaciones: String(`[Motivo: ${motivoBaja}] - ${observacionesBaja}`),
      sede: String(resultado.ambiente?.piso?.pabellon?.sede?.nombre || '---'),
      pabellon: String(resultado.ambiente?.piso?.pabellon?.nombre || '---'),
      piso: String(resultado.ambiente?.piso?.nombre || '---'),
      ambiente: String(resultado.ambiente?.nombre || '---'),
      fotoBaja: fotoUrlBaja || undefined,
    };

    // Y se la ponemos directamente a la función que la envía:
    enviarCorreoAlertaBaja(datosCorreo as any).catch(err => 
      console.error("❌ Error enviando alerta de baja:", err)
    );

    res.json({ 
        success: true, 
        message: "Equipo dado de baja exitosamente", 
        activo: resultado 
    });

  } catch (error: any) {
    console.error("Error en darDeBajaActivo:", error);
    res.status(500).json({ error: "Error al procesar la baja del activo" });
  }
};

export const obtenerHistorialBajas = async (req: Request, res: Response): Promise<void> => {
  try {
    const historial = await prisma.historialBaja.findMany({
      include: {
        activo: {
          select: {
            codigo: true,
            nombre: true,
            estado: true,
            estadoInv: true, 
          }
        }
      },
      orderBy: {
        fechaBaja: 'desc' 
      }
    });
    res.json(historial);
  } catch (error) {
    console.error("Error al obtener el historial de bajas:", error);
    res.status(500).json({ error: "Error interno del servidor al cargar las bajas" });
  }
};

export const updateActivo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { 
    nombre, categoria, sistema, ambienteId, 
    marca, modelo, serie, estadoInv, observaciones 
  } = req.body;

  const archivoNuevo = req.file as Express.Multer.File | undefined;

  let detalle = null;
  if (req.body.detalle) {
    try {
      detalle = typeof req.body.detalle === 'string' 
        ? JSON.parse(req.body.detalle) 
        : req.body.detalle;
    } catch (e) {
      console.error("Error al parsear detalle en update:", e);
    }
  }

  try {
    const activoPrevio = await prisma.activo.findUnique({ where: { id: Number(id) } });
    let urlImagen = activoPrevio?.foto || null; 

    if (archivoNuevo) {
      const fileName = `activos/${Date.now()}-${archivoNuevo.originalname.replace(/\s+/g, '_')}`;
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({ resumable: false });

      await new Promise((resolve, reject) => {
        blobStream.on("error", (err) => reject(err));
        blobStream.on("finish", () => {
          urlImagen = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          resolve(urlImagen);
        });
        blobStream.end(archivoNuevo.buffer);
      });

      if (activoPrevio?.foto) {
        try {
          const nombreArchivoViejo = activoPrevio.foto.split(`${bucket.name}/`)[1];
          if (nombreArchivoViejo) {
            await bucket.file(nombreArchivoViejo).delete();
          }
        } catch (err) {
          console.log("No se pudo borrar la foto vieja, pero procedemos con la nueva.");
        }
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      const activoActualizado = await tx.activo.update({
        where: { id: Number(id) },
        data: {
          nombre,
          categoria,
          sistema,
          marca: marca || null,
          modelo: modelo || null,
          serie: serie || null,
          estadoInv: estadoInv || 'ALTA',
          observaciones: observaciones || null,
          foto: urlImagen,
          ambienteId: Number(ambienteId)
        }
      });

      if (sistema === 'SISTEMA EXTINCIÓN MANUAL' && detalle) {
    
        // Ponemos este mensaje temporal para asegurarnos de que entró
        console.log("✅ ¡ENTRÓ AL BLOQUE DE DETALLE EXTINTOR!");
        let fRecarga: Date | null = null;
        let fMantenimiento: Date | null = null;
        let proximoTipo: string = "";

        const fechaServicioEntrada = new Date(`${detalle.fechaUltimoServicio}T00:00:00`);
        
        if (detalle.tipoUltimoServicio === 'RECARGA') {
          fRecarga = fechaServicioEntrada;
          proximoTipo = "MANTENIMIENTO";
        } else {
          fMantenimiento = fechaServicioEntrada;
          proximoTipo = "RECARGA";
        }

        const proximaFecha = new Date(fechaServicioEntrada);
        proximaFecha.setFullYear(proximaFecha.getFullYear() + 1);

        const fPH_Entrada = new Date(`${detalle.fechaUltimaPH}T00:00:00`);
        const vencimientoPH = new Date(fPH_Entrada);
        vencimientoPH.setFullYear(vencimientoPH.getFullYear() + 5);

        await tx.detalleExtintor.upsert({
          where: { activoId: Number(id) },
          update: {
            numInterno: detalle.numInterno ? Number(detalle.numInterno) : null,
            fabricacion: detalle.fabricacion ? Number(detalle.fabricacion) : null,
            capacidad: detalle.capacidad || null,
            agente: detalle.agente || null,
            fechaUltimaRecarga: fRecarga,
            fechaUltimoMantenimiento: fMantenimiento,
            fechaUltimaPH: fPH_Entrada,
            proximoServicioTipo: proximoTipo,
            proximoServicioFecha: proximaFecha,
            vencimientoPH: vencimientoPH
          },
          create: {
            activoId: Number(id),
            numInterno: detalle.numInterno ? Number(detalle.numInterno) : null,
            fabricacion: detalle.fabricacion ? Number(detalle.fabricacion) : null,
            capacidad: detalle.capacidad || null,
            agente: detalle.agente || null,
            fechaUltimaRecarga: fRecarga,
            fechaUltimoMantenimiento: fMantenimiento,
            fechaUltimaPH: fPH_Entrada,
            proximoServicioTipo: proximoTipo,
            proximoServicioFecha: proximaFecha,
            vencimientoPH: vencimientoPH
          }
        });
      }

      return activoActualizado;
    });

    res.json({
      success: true,
      message: "Activo y foto actualizados con éxito",
      data: result
    });

  } catch (error: any) {
    console.error("Error IPS Update:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// 🎯 ACTUALIZADO: Exportar Excel limpio sin Unidad ni Zonal
export const exportarActivosExcel = async (req: Request, res: Response): Promise<void> => {
  try {
    const activos = await prisma.activo.findMany({
      include: {
        ambiente: {
          include: {
            piso: {
              include: {
                pabellon: {
                  include: { 
                    sede: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { codigo: 'asc' }
    });

    const datos = activos.map(activo => ({
      CODIGO: activo.codigo,
      DISPOSITIVO: activo.nombre,
      MARCA: activo.marca || '-',
      MODELO: activo.modelo || '-',
      SERIE: activo.serie || 'S/N',
      SISTEMA: activo.sistema,
      CATEGORIA: activo.categoria,
      SEDE: activo.ambiente?.piso?.pabellon?.sede?.nombre || '-',
      PABELLON: activo.ambiente?.piso?.pabellon?.nombre || '-',
      PISO: activo.ambiente?.piso?.nombre || '-',
      AMBIENTE: activo.ambiente?.nombre || '-',
      ESTADO: activo.estado,
      'ESTADO INV': activo.estadoInv
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);

    const columnWidths = [
      { wch: 12 }, // CODIGO
      { wch: 20 }, // DISPOSITIVO
      { wch: 15 }, // MARCA
      { wch: 15 }, // MODELO
      { wch: 18 }, // SERIE
      { wch: 35 }, // SISTEMA
      { wch: 22 }, // CATEGORIA
      { wch: 18 }, // SEDE
      { wch: 18 }, // PABELLON
      { wch: 12 }, // PISO
      { wch: 18 }, // AMBIENTE
      { wch: 12 }, // ESTADO
      { wch: 12 }  // ESTADO INV
    ];

    ws['!cols'] = columnWidths;

    const headerRange = XLSX.utils.decode_range(ws['!ref']!);
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_col(col) + '1';
      if (ws[cellAddress]) {
        ws[cellAddress].s = {
          font: { bold: true, color: 'FFFFFF' },
          fill: { fgColor: { rgb: '2B59C3' } },
          alignment: { horizontal: 'center', vertical: 'center', wrapText: true }
        };
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, 'Activos');

    const nombreArchivo = `Reporte_Activos_${new Date().toISOString().split('T')[0]}.xlsx`;
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);

  } catch (error: any) {
    console.error("Error al exportar:", error);
    res.status(500).json({ 
      success: false, 
      error: "Error al exportar activos a Excel",
      details: error.message 
    });
  }
};

// 🎯 ACTUALIZADO: Importación masiva requiere solo Sede hacia abajo
export const importarActivosExcel = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No se subió archivo" });

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0] as string; // ✅ Corrección 1 aquí
    const data: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]!);

    const logs = { creados: 0, errores: [] as any[] };

    const formatFecha = (val: any) => {
      if (!val) return null;
      if (typeof val === 'number') {
        const fechaReal = new Date(Math.round((val - 25569) * 86400 * 1000));
        return isNaN(fechaReal.getTime()) ? null : fechaReal;
      }
      if (typeof val === 'string' && val.includes('/')) {
        // ✅ Corrección 2 aquí:
        const [dia = '', mes = '', anio = ''] = val.split('/'); 
        const d = new Date(`${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}T00:00:00`);
        return isNaN(d.getTime()) ? null : d;
      }
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d;
    };

    const parseSafeNumber = (val: any) => {
      if (val === undefined || val === null || val === '') return null;
      const num = Number(val);
      return isNaN(num) ? null : num; 
    };

    await prisma.$transaction(async (tx) => {
      for (const [index, fila] of data.entries()) {
        try {
          const sedeNom = fila.SEDE?.toString().trim();
          const pabNom = fila.PABELLON?.toString().trim();
          const pisoNom = fila.PISO?.toString().trim();
          const ambNom = fila.AMBIENTE?.toString().trim();

          if (!sedeNom || !pabNom || !pisoNom || !ambNom) {
            throw new Error(`Faltan datos de ubicación. Asegúrate de llenar Sede, Pabellón, Piso y Ambiente.`);
          }

          const ambId = await buscarAmbienteId(tx, sedeNom, pabNom, pisoNom, ambNom);
          
          if (!ambId) {
            throw new Error(`Ubicación no encontrada: ${sedeNom} > ${pabNom} > ${pisoNom} > ${ambNom}. Revisa que existan en el sistema.`);
          }

          const serieLimpia = fila.SERIE?.toString().trim();
          const seriesIgnoradas = ['S/N', 'N/A', '-', '', 'SIN NUMERO', 'SIN NÚMERO'];

          if (serieLimpia && !seriesIgnoradas.includes(serieLimpia.toUpperCase())) {
            const activoDuplicado = await tx.activo.findFirst({
              where: {
                serie: serieLimpia,
                ambiente: {
                  piso: {
                    pabellon: {
                      sede: { nombre: sedeNom }
                    }
                  }
                }
              },
              select: { id: true, codigo: true }
            });

            if (activoDuplicado) {
              throw new Error(`Serie duplicada: La serie/lote '${serieLimpia}' ya pertenece al activo [${activoDuplicado.codigo}].`);
            }
          }

          const codigoAuto = await generarSiguienteCodigo(tx);

          const nuevoActivo = await tx.activo.create({
            data: {
              codigo: codigoAuto,
              nombre: fila.DISPOSITIVO,
              categoria: fila.CATEGORIA,
              sistema: fila.SISTEMA,
              marca: fila.MARCA?.toString() || null,
              modelo: fila.MODELO?.toString() || null,
              serie: serieLimpia || null,
              estadoInv: fila.ESTADO_INV || fila['ESTADO INV'] || 'ALTA',
              observaciones: fila.COMENTARIO || fila.OBSERVACIONES || null,
              ambienteId: ambId
            }
          });

          if (fila.SISTEMA === 'SISTEMA EXTINCIÓN MANUAL') {
            const fechaServ = formatFecha(fila.EXT_ULT_FECHA);
            const fechaPH = formatFecha(fila.EXT_PH_FECHA);

            let proximaFecha = null;
            if (fechaServ) {
              proximaFecha = new Date(fechaServ);
              proximaFecha.setFullYear(proximaFecha.getFullYear() + 1);
            }

            let vencPH = null;
            if (fechaPH) {
              vencPH = new Date(fechaPH);
              vencPH.setFullYear(vencPH.getFullYear() + 5);
            }

            await tx.detalleExtintor.create({
              data: {
                activoId: nuevoActivo.id,
                numInterno: parseSafeNumber(fila.EXT_NUM_INT),
                fabricacion: parseSafeNumber(fila.EXT_FABRICA),
                capacidad: fila.EXT_PESO?.toString() || null,
                agente: null,
                fechaUltimaRecarga: fila.EXT_ULT_TIPO === 'RECARGA' ? fechaServ : null,
                fechaUltimoMantenimiento: fila.EXT_ULT_TIPO === 'MANTENIMIENTO' ? fechaServ : null,
                fechaUltimaPH: fechaPH,
                proximoServicioTipo: fila.EXT_ULT_TIPO === 'RECARGA' ? 'MANTENIMIENTO' : (fila.EXT_ULT_TIPO === 'MANTENIMIENTO' ? 'RECARGA' : null),
                proximoServicioFecha: proximaFecha,
                vencimientoPH: vencPH
              }
            });
          }
          logs.creados++;
        } catch (filaErr: any) {
          logs.errores.push({ fila: index + 2, error: filaErr.message });
        }
      }
    }, { timeout: 60000 });

    res.json({ success: true, ...logs });

  } catch (error: any) {
    console.log("❌ ERROR CRÍTICO EN LA IMPORTACIÓN:");
    console.error(error);
    res.status(500).json({ 
      success: false, 
      error: "Fallo en el servidor durante la importación", 
      detalle: error.message 
    });
  }
};

export const subirFotoController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const archivo = req.file;

        if (!archivo) {
            return res.status(400).json({ message: "No se ha enviado ninguna imagen." });
        }

        res.status(200).json({ message: "Foto subida" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};