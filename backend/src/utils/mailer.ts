import nodemailer from "nodemailer";
import path from "path";
import fs from "fs-extra";

export const enviarCorreoQR = async (
  emailDestino: string,
  nombre: string,
  qrBase64: string
) => {
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    /* ========================= */
    /* CARPETA TEMP */
    /* ========================= */

    const carpetaQR = path.join(__dirname, "../../temp/qrs");

    await fs.ensureDir(carpetaQR);

    /* ========================= */
    /* NOMBRE ARCHIVO */
    /* ========================= */

    const nombreArchivo = `qr-${Date.now()}.png`;

    const rutaQR = path.join(carpetaQR, nombreArchivo);

    /* ========================= */
    /* LIMPIAR BASE64 */
    /* ========================= */

    const base64Data = qrBase64.replace(
      /^data:image\/png;base64,/,
      ""
    );

    /* ========================= */
    /* GUARDAR PNG */
    /* ========================= */

    await fs.writeFile(
      rutaQR,
      base64Data,
      "base64"
    );

    console.log("✅ QR guardado:", rutaQR);

    /* ========================= */
    /* ENVIAR CORREO */
    /* ========================= */

    await transporter.sendMail({
      from: `"Sistema Visitas" <${process.env.SMTP_USER}>`,
      to: emailDestino,
      subject: "¡Acceso Autorizado!",

      html: `
        <div style="font-family: Arial; padding: 20px;">

          <h2>¡Acceso Autorizado!</h2>

          <p>
            Hola <b>${nombre}</b>,
          </p>

          <p>
            Tu ingreso fue aprobado.
          </p>

          <hr />

          <p>
            Presenta este QR:
          </p>

          <img
            src="cid:qrcode"
            width="220"
          />

        </div>
      `,

      attachments: [
        {
          filename: nombreArchivo,
          path: rutaQR,
          cid: "qrcode",
        },
      ],
    });

    console.log("📩 Correo enviado");

    /* ========================= */
    /* ELIMINAR TEMP */
    /* ========================= */

    await fs.remove(rutaQR);

    console.log("🗑️ QR eliminado");

  } catch (error: any) {

    console.error(
      "❌ Error enviando correo:",
      error.message
    );

  }
};