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
export const enviarCorreoContrata = async (email: string, contrata: any) => {
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
const link = `http://localhost:5173/registro-visita/${contrata.tokenAcceso}`;
    await transporter.sendMail({
      from: `"Sistema Visitas" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Registro de Contrata Creado ✔",
      html: `
        <h2>Registro de Contrata</h2>
        <p><b>Código:</b> ${contrata.codigo}</p>
        <p><b>Empresa:</b> ${contrata.empresaContratista}</p>
        <p><b>Fecha:</b> ${contrata.fechaInicio}</p>

        <a 
        href="${link}"
        style="background:#1E55C0;color:white;padding:12px 18px;border-radius:8px;text-decoration:none;display:inline-block"
      >
        REGISTRAR VISITANTES
      </a>
      `,
    });

    console.log("📩 Correo enviado");
  } catch (error) {
    console.log("❌ Error correo:", error);
  }
};
export const enviarCorreoQRContrata = async (
  emailDestino: string,
  nombre: string,
  empresa: string,
  qrBase64: string
) => {

  try {

    const transporter =
      nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure:
          Number(process.env.SMTP_PORT) === 465,

        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },

        tls: {
          rejectUnauthorized: false,
        },
      });

    const carpetaQR =
      path.join(__dirname, "../../temp/qrs");

    await fs.ensureDir(carpetaQR);

    const nombreArchivo =
      `qr-contrata-${Date.now()}.png`;

    const rutaQR =
      path.join(carpetaQR, nombreArchivo);

    const base64Data =
      qrBase64.replace(
        /^data:image\/png;base64,/,
        ""
      );

    await fs.writeFile(
      rutaQR,
      base64Data,
      "base64"
    );

    await transporter.sendMail({

      from:
        `"Sistema Contratas" <${process.env.SMTP_USER}>`,

      to: emailDestino,

      subject:
        "Acceso autorizado para contratista",

      html: `
        <div style="font-family:Arial;padding:20px;">

          <h2 style="color:#16a34a;">
            Acceso Autorizado
          </h2>

          <p>
            Hola <b>${nombre}</b>,
          </p>

          <p>
            Su registro como trabajador de la empresa
            <b>${empresa}</b>
            ha sido aprobado.
          </p>

          <p>
            Presente el siguiente QR en el ingreso:
          </p>

          <img
            src="cid:qrcode"
            width="250"
          />

          <br/><br/>

          <p>
            Este código es personal e intransferible.
          </p>

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

    await fs.remove(rutaQR);

  } catch (error: any) {

    console.log(
      "Error enviando QR Contrata:",
      error.message
    );

  }

};
export const enviarCorreoRechazoContrata = async (
  email: string,
  nombre: string,
  motivo: string,
  token: string
) => {

  const link =
    `http://localhost:5173/registro-visita/${token}`;

  const transporter =
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure:
      Number(process.env.SMTP_PORT) === 465,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },

    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: `"Sistema Contratas" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Contrata rechazada",

    html: `
      <h2>Contrata observada</h2>

      <p>
        Hola ${nombre},
      </p>

      <p>
        La solicitud fue observada por Seguridad.
      </p>

      <p>
        <b>Motivo:</b>
        ${motivo}
      </p>

      <p>
        Puede corregir la información desde:
      </p>

      <a href="${link}">
        Corregir Registro
      </a>
    `,
  });
};
export const enviarCorreoContrataInhouse = async (email: string, contrata: any) => {
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
const link = `http://localhost:5173/registro-visita-inhouse/${contrata.tokenAcceso}`;
    await transporter.sendMail({
      from: `"Sistema Visitas" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Registro de Contrata Creado ✔",
      html: `
        <h2>Registro de Contrata</h2>
        <p><b>Código:</b> ${contrata.codigo}</p>
        <p><b>Empresa:</b> ${contrata.empresaContratista}</p>
        <p><b>Fecha:</b> ${contrata.fechaInicio}</p>

        <a 
        href="${link}"
        style="background:#1E55C0;color:white;padding:12px 18px;border-radius:8px;text-decoration:none;display:inline-block"
      >
        REGISTRAR VISITANTES
      </a>
      `,
    });

    console.log("📩 Correo enviado");
  } catch (error) {
    console.log("❌ Error correo:", error);
  }
};
export const enviarCorreoQRContrataInhouse = async (
  emailDestino: string,
  nombre: string,
  empresa: string,
  qrBase64: string
) => {

  try {

    const transporter =
      nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure:
          Number(process.env.SMTP_PORT) === 465,

        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },

        tls: {
          rejectUnauthorized: false,
        },
      });

    const carpetaQR =
      path.join(__dirname, "../../temp/qrs");

    await fs.ensureDir(carpetaQR);

    const nombreArchivo =
      `qr-contrata-${Date.now()}.png`;

    const rutaQR =
      path.join(carpetaQR, nombreArchivo);

    const base64Data =
      qrBase64.replace(
        /^data:image\/png;base64,/,
        ""
      );

    await fs.writeFile(
      rutaQR,
      base64Data,
      "base64"
    );

    await transporter.sendMail({

      from:
        `"Sistema Contratas" <${process.env.SMTP_USER}>`,

      to: emailDestino,

      subject:
        "Acceso autorizado para contratista",

      html: `
        <div style="font-family:Arial;padding:20px;">

          <h2 style="color:#16a34a;">
            Acceso Autorizado
          </h2>

          <p>
            Hola <b>${nombre}</b>,
          </p>

          <p>
            Su registro como trabajador de la empresa
            <b>${empresa}</b>
            ha sido aprobado.
          </p>

          <p>
            Presente el siguiente QR en el ingreso:
          </p>

          <img
            src="cid:qrcode"
            width="250"
          />

          <br/><br/>

          <p>
            Este código es personal e intransferible.
          </p>

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

    await fs.remove(rutaQR);

  } catch (error: any) {

    console.log(
      "Error enviando QR Contrata:",
      error.message
    );

  }

};
export const enviarCorreoRechazoContrataInhouse = async (
  email: string,
  nombre: string,
  motivo: string,
  token: string
) => {

  const link =
    `http://localhost:5173/registro-visita-inhouse/${token}`;

  const transporter =
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure:
      Number(process.env.SMTP_PORT) === 465,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },

    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: `"Sistema Contratas" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Contrata rechazada",

    html: `
      <h2>Contrata observada</h2>

      <p>
        Hola ${nombre},
      </p>

      <p>
        La solicitud fue observada por Seguridad.
      </p>

      <p>
        <b>Motivo:</b>
        ${motivo}
      </p>

      <p>
        Puede corregir la información desde:
      </p>

      <a href="${link}">
        Corregir Registro
      </a>
    `,
  });
};