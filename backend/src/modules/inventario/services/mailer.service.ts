import nodemailer from 'nodemailer';
import axios from 'axios';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com", 
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, 
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  },
});

export interface DatosBajaExtintor {
  codigo: string;
  nombre: string;
  marca: string;
  modelo: string;
  serie: string;
  numInterno: string;
  observaciones: string;
  sede: string;
  pabellon: string;
  piso: string;
  ambiente: string;
  fotoBaja?: string; // ✅ URL de la foto de baja
}

export const enviarCorreoAlertaBaja = async (datos: DatosBajaExtintor): Promise<void> => {
  const correosDestinatarios = [
    "carlosmanuelibarra11@gmail.com",
    "seguridad.salud@tuempresa.com"
  ];

  let attachments: any[] = [];
  let fotoHtml = '';

  // 🖼️ Si hay foto, la descargamos y adjuntamos
  if (datos.fotoBaja) {
    try {
      const response = await axios.get(datos.fotoBaja, {
        responseType: 'arraybuffer',
        timeout: 10000
      });

      const buffer = Buffer.from(response.data, 'binary');
      const nombreFoto = `baja_${datos.codigo}_${Date.now()}.jpg`;

      attachments.push({
        filename: nombreFoto,
        content: buffer,
        cid: 'fotoBaja' // Content ID para incrustarla en el HTML
      });

      // HTML que muestra la imagen incrustada
      fotoHtml = `
        <h3 style="color: #2B59C3; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; margin-top: 24px; font-size: 13px; text-transform: uppercase; font-weight: 900;">📸 Evidencia Fotográfica</h3>
        <div style="text-align: center; margin: 16px 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #f8fafc;">
          <img src="cid:fotoBaja" alt="Foto de Baja" style="max-width: 100%; height: auto; display: block; border-radius: 12px;" />
        </div>
      `;
    } catch (error) {
      console.error('❌ Error descargando foto para adjuntar:', error);
      // Continuar sin adjuntar foto si hay error
    }
  }

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">
      
      <div style="background-color: #dc2626; color: white; padding: 24px; text-align: center;">
        <h2 style="margin: 0; text-transform: uppercase; font-size: 18px; letter-spacing: 0.05em; font-weight: 900;">
          ⚠️ RETIRO / BAJA DE EQUIPO CRÍTICO
        </h2>
        <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.8; font-weight: bold; uppercase">Sistema de Alertas Globales IPS</p>
      </div>
      
      <div style="padding: 24px; line-height: 1.6; background-color: #ffffff;">
        <p style="margin-top: 0;">Estimado equipo de <strong>Seguridad y Operaciones</strong>,</p>
        <p>Se les notifica que un equipo contra incendios ha sido registrado como <strong style="color: #dc2626; background-color: #fef2f2; padding: 2px 6px; border-radius: 6px;">INACTIVO (DADO DE BAJA)</strong>. La zona de procedencia se encuentra temporalmente desprotegida hasta su revisión o reemplazo.</p>
        
        <h3 style="color: #2B59C3; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; margin-top: 24px; font-size: 13px; text-transform: uppercase; font-weight: 900;">📋 Detalles del Equipo</h3>
        <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
          <tr><td style="padding: 4px 0; color: #94a3b8; width: 130px;"><strong>Código de Activo:</strong></td><td style="font-weight: bold; color: #2B59C3;">${datos.codigo}</td></tr>
          <tr><td style="padding: 4px 0; color: #94a3b8;"><strong>Dispositivo:</strong></td><td style="font-weight: bold;">${datos.nombre}</td></tr>
          <tr><td style="padding: 4px 0; color: #94a3b8;"><strong>Marca / Modelo:</strong></td><td>${datos.marca} / ${datos.modelo}</td></tr>
          <tr><td style="padding: 4px 0; color: #94a3b8;"><strong>N° Serie:</strong></td><td style="font-family: monospace; font-size: 12px;">${datos.serie}</td></tr>
          <tr><td style="padding: 4px 0; color: #94a3b8;"><strong>N° Interno:</strong></td><td>${datos.numInterno}</td></tr>
        </table>

        <h3 style="color: #2B59C3; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; margin-top: 24px; font-size: 13px; text-transform: uppercase; font-weight: 900;">📍 Jerarquía de Ubicación</h3>
        <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
          <tr><td style="padding: 4px 0; color: #94a3b8; width: 130px;"><strong>Sede Física:</strong></td><td style="font-weight: bold; color: #2B59C3;">${datos.sede}</td></tr>
          <tr><td style="padding: 4px 0; color: #94a3b8;"><strong>Ubicación Interna:</strong></td><td>${datos.pabellon} — ${datos.piso} — ${datos.ambiente}</td></tr>
        </table>

        ${fotoHtml}

        <h3 style="color: #2B59C3; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; margin-top: 24px; font-size: 13px; text-transform: uppercase; font-weight: 900;">💬 Reporte del Técnico</h3>
        <div style="background-color: #f8fafc; border-left: 4px solid #cbd5e1; padding: 12px; font-style: italic; border-radius: 0 12px 12px 0; font-size: 13px; color: #475569;">
          "${datos.observaciones}"
        </div>

        <div style="text-align: center; margin-top: 32px; margin-bottom: 12px;">
          <a href="https://gestion.ipsoftperu.com/login/extintores" style="background-color: #2B59C3; color: white; padding: 12px 28px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 13px; display: inline-block; box-shadow: 0 10px 15px -3px rgba(43, 89, 195, 0.2);">
            Gestionar Extintor
          </a>
        </div>
      </div>
      
      <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">
        IPS Security Cloud System — IPS Global
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"IPS Alertas" <${process.env.SMTP_USER}>`,
    to: correosDestinatarios.join(', '),
    subject: `🚨 ALERTA CRÍTICA: Baja de Extintor ${datos.codigo} - Sede ${datos.sede}`,
    html: htmlContent,
    attachments: attachments, // ✅ Adjunta la foto para descargar
  });
};