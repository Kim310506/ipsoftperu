// src/modules/incidentes/controllers/incidentes.controller.ts
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import {

  listarOcurrenciasService,
  obtenerOcurrenciaService,
  crearOcurrenciaService,
  actualizarEstadoOcurrenciaService,
  eliminarOcurrenciaService,
  resumenOcurrenciasService,
  crearReporteService,
  crearSolucionService,
  dashboardOcurrenciasService,
  rechazarSolucionService,
  cerrarOcurrenciaService,
 generarPdfIncidente

} from "./incidentes.service";


// LISTAR
export const listarOcurrencias =
async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await listarOcurrenciasService();

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al listar ocurrencias"

    });

  }

};


// OBTENER
export const obtenerOcurrencia =
async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    const data =
      await obtenerOcurrenciaService(id);

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al obtener ocurrencia"

    });

  }

};


// CREAR
export const crearOcurrencia =
async (
  req: Request,
  res: Response
) => {

  try {

    const ocurrencia =
      await crearOcurrenciaService(
        req.body,
        req.files as Express.Multer.File[]
      );

    res.json({

      message:
        "Ocurrencia registrada",

      ocurrencia

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al registrar ocurrencia"

    });

  }

};
// ACTUALIZAR ESTADO
export const actualizarEstadoOcurrencia =
async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    const data =
      req.body;

    const ocurrencia =
      await actualizarEstadoOcurrenciaService(
        id,
        data
      );

    res.json({

      message:
        "Estado actualizado",

      ocurrencia

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al actualizar estado"

    });

  }

};


// ELIMINAR
export const eliminarOcurrencia =
async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    await eliminarOcurrenciaService(id);

    res.json({

      message:
        "Ocurrencia eliminada"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al eliminar"

    });

  }

};
export const resumenOcurrencias =
async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await resumenOcurrenciasService();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        "Error resumen"
    });

  }

};

export const crearReporte =
async (
  req: Request,
  res: Response
) => {

  try {

    const ocurrenciaId =
      Number(req.params.id);

    const { mensaje } =
      req.body;

    const usuarioId = 1;

    const reporte =
      await crearReporteService(

        ocurrenciaId,
        usuarioId,
        mensaje

      );

    res.json({

      message:
        "Reporte registrado",

      reporte

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al registrar reporte"

    });

  }

};
export const crearSolucion =
async (req: Request, res: Response) => {

  try {

    const ocurrenciaId = Number(req.params.id);

    const { mensaje, usuarioId } = req.body;

    const files = req.files as Express.Multer.File[];

    const solucion = await crearSolucionService(
      ocurrenciaId,
      Number(usuarioId),
      mensaje,
      files
    );

    res.json({
      message: "Solución registrada",
      solucion
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al registrar solución"
    });

  }
};
export const dashboardOcurrencias = async (req: Request, res: Response) => {
  try {
    const data = await dashboardOcurrenciasService();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error dashboard ocurrencias",
    });
  }
};
export const cerrarOcurrencia =
async (
  req: Request,
  res: Response
) => {

  try {

    const ocurrenciaId =
      Number(req.params.id);

    const usuarioId = 1;

    const data =
      await cerrarOcurrenciaService(
        ocurrenciaId,
        usuarioId
      );

    res.json({
      message: "Caso cerrado",
      data
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al cerrar caso"
    });

  }

};
export const rechazarSolucion =
async (
  req: Request,
  res: Response
) => {

  try {

    const ocurrenciaId =
      Number(req.params.id);

    const { motivo } =
      req.body;

    const usuarioId = 1;

    const data =
      await rechazarSolucionService(
        ocurrenciaId,
        usuarioId,
        motivo
      );

    res.json({
      message: "Solución rechazada",
      data
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al rechazar solución"
    });

  }

};
export const exportarPdf = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const incidente =
      await generarPdfIncidente(id);

    const doc = new PDFDocument({
      margin: 40,
      size: "A4"
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Ocurrencia_${incidente.codigo}.pdf`
    );

    doc.pipe(res);

    // =========================
    // ENCABEZADO
    // =========================

    doc
      .rect(0, 0, 700, 90)
      .fill("#1e40af");

    doc
      .fillColor("white")
      .fontSize(24)
      .text(
        "REPORTE DE OCURRENCIA",
        0,
        25,
        {
          align: "center"
        }
      );

    doc
      .fontSize(12)
      .text(
        `Código: ${incidente.codigo}`,
        {
          align: "center"
        }
      );

    doc.moveDown(4);

    // =========================
    // INFORMACIÓN GENERAL
    // =========================

    doc
      .fillColor("#1e40af")
      .fontSize(18)
      .text("1. INFORMACIÓN GENERAL");

    doc.moveDown();

    doc.fillColor("black");

    doc.text(`Estado: ${incidente.estado}`);
    doc.text(`Campus: ${incidente.sede?.nombre || "-"}`);
    doc.text(`Ambiente: ${incidente.ambiente?.nombre || "-"}`);
    doc.text(`Categoría: ${incidente.categoria}`);
    doc.text(`Tipo: ${incidente.tipo}`);
    doc.text(`Subcategoría: ${incidente.subcategoria}`);
    doc.text(`Motivo: ${incidente.motivo}`);
    doc.text(
      `Fecha Registro: ${new Date(
        incidente.createdAt
      ).toLocaleString()}`
    );

    doc.moveDown(2);

    // =========================
    // DETALLE
    // =========================

    doc
      .fillColor("#1e40af")
      .fontSize(18)
      .text("2. DETALLE DEL INCIDENTE");

    doc.moveDown();

    doc.fillColor("black");

    doc.text(
      incidente.detalle || "-"
    );

    doc.moveDown();

    // =========================
    // EVIDENCIA INICIAL
    // =========================

    if (
      incidente.evidencias &&
      incidente.evidencias.length > 0
    ) {

      doc.addPage();

      doc
        .fillColor("#1e40af")
        .fontSize(18)
        .text("3. EVIDENCIA INICIAL");

      doc.moveDown();

      incidente.evidencias.forEach(
        (img: any) => {

          try {

            const rutaImagen =
              path.join(
                process.cwd(),
                img.url.replace(/^\/+/, "")
              );

            console.log(
              "EVIDENCIA:",
              rutaImagen
            );

            if (
              fs.existsSync(
                rutaImagen
              )
            ) {

              doc.image(
                rutaImagen,
                {
                  fit: [450, 280],
                  align: "center"
                }
              );

              doc.moveDown();

            }

          } catch (error) {

            console.log(
              "Error imagen:",
              img.url
            );

          }

        }
      );

    }

    // =========================
    // HISTORIAL
    // =========================

    doc.addPage();

    doc
      .fillColor("#1e40af")
      .fontSize(18)
      .text("4. GESTIÓN Y SOLUCIÓN");

    doc.moveDown();

    incidente.historial.forEach(
      (item: any) => {

        doc
          .fillColor("#2563eb")
          .fontSize(15)
          .text(item.tipo);

        doc.moveDown(0.5);

        doc.fillColor("black");

        doc.text(
          item.mensaje || "-"
        );

        doc.text(
          `Usuario: ${
            item.usuario?.correo || "-"
          }`
        );

        doc.text(
          `Fecha: ${new Date(
            item.createdAt
          ).toLocaleString()}`
        );

        doc.moveDown();

        // =====================
        // IMÁGENES DE SOLUCIÓN
        // =====================

        if (
          item.evidencias &&
          item.evidencias.length > 0
        ) {

          item.evidencias.forEach(
            (img: any) => {

              try {

                const rutaImagen =
                  path.join(
                    process.cwd(),
                    img.url.replace(/^\/+/, "")
                  );

                console.log(
                  "SOLUCION:",
                  rutaImagen
                );

                if (
                  fs.existsSync(
                    rutaImagen
                  )
                ) {

                  doc.image(
                    rutaImagen,
                    {
                      fit: [350, 220],
                      align: "center"
                    }
                  );

                  doc.moveDown();

                }

              } catch (error) {

                console.log(
                  "No se pudo cargar:",
                  img.url
                );

              }

            }
          );

        }

        doc.moveDown(2);

      }
    );

    // =========================
    // PIE
    // =========================

    doc.moveDown();

    doc
      .fontSize(10)
      .fillColor("gray")
      .text(
        "Sistema de Gestión de Ocurrencias",
        {
          align: "center"
        }
      );

    doc.text(
      new Date().toLocaleString(),
      {
        align: "center"
      }
    );

    doc.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al generar PDF"
    });

  }

};