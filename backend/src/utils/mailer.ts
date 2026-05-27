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

export const enviarCorreoRegistroExterno = async (
emailDestino: string,
nombre: string,
link: string
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

await transporter.sendMail({

  from: `"Sistema Visitas" <${process.env.SMTP_USER}>`,

  to: emailDestino,

  subject: "Registro de visitantes",

  html: `
  
    <div style="font-family: Arial; padding:20px;">

      <h2 style="color:#1E55C0;">
        Registro de Visita Externa
      </h2>

      <p>
        Hola <b>${nombre}</b>,
      </p>

      <p>
        Se ha generado una visita externa.
      </p>

      <p>
        Debe registrar los visitantes desde el siguiente enlace:
      </p>

      <br />

      <a 
        href="${link}"
        style="
          background:#1E55C0;
          color:white;
          padding:14px 22px;
          border-radius:10px;
          text-decoration:none;
          font-weight:bold;
          display:inline-block;
        "
      >
        REGISTRAR VISITANTES
      </a>

      <br /><br />

      <p style="font-size:13px;color:gray;">
        Sistema de Visitas
      </p>

    </div>

  `,
});
console.log("📩 Correo de registro enviado");
} catch (error: any) {

console.log(
  "❌ Error correo externo:",
  error.message
);
}
};
export const enviarCorreoCancelacion = async (
  to: string,
  nombre: string,
  motivo: string
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

    await transporter.sendMail({

      from: `"Sistema Visitas" <${process.env.SMTP_USER}>`,

      to,

      subject: "Visita cancelada",

      html: `
        <div style="font-family: Arial; padding:20px;">

          <h2 style="color:#dc2626;">
            Visita cancelada
          </h2>

          <p>
            Hola <b>${nombre}</b>,
          </p>

          <p>
            La visita fue cancelada.
          </p>

          <p>
            <b>Motivo:</b>
            ${motivo}
          </p>

        </div>
      `,
    });

    console.log("📩 Correo cancelación enviado:", to);

  } catch (error: any) {

    console.log(
      "❌ Error correo cancelación:",
      error.message
    );

  }

};
export const enviarCorreoDesautorizacion = async (
  to: string,
  nombre: string,
  motivo: string
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

    await transporter.sendMail({

      from: `"Sistema Visitas" <${process.env.SMTP_USER}>`,

      to,

      subject: "Visita desautorizada",

      html: `
        <div style="font-family: Arial; padding:20px;">

          <h2 style="color:#dc2626;">
            Visita desautorizada
          </h2>

          <p>
            Hola <b>${nombre}</b>,
          </p>

          <p>
            La visita fue desautorizada.
          </p>

          <p>
            <b>Motivo:</b>
            ${motivo}
          </p>

        </div>
      `,
    });

    console.log(
      "📩 Correo desautorización enviado:",
      to
    );

  } catch (error: any) {

    console.log(
      "❌ Error correo desautorización:",
      error.message
    );

  }

};