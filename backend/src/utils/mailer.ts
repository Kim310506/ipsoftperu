import nodemailer from "nodemailer";
import QRCode from "qrcode";

export const enviarCorreoQR = async (
  emailDestino: string,
  nombre: string,
  codigoVisita: string
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

    // ✅ QR SIMPLE
    const qrBuffer = await QRCode.toBuffer(codigoVisita, {
      width: 180,
      margin: 1,
      errorCorrectionLevel: "L",
    });

    await transporter.sendMail({
      from: `"Sistema Visitas" <${process.env.SMTP_USER}>`,
      to: emailDestino,
      subject: "¡Acceso Autorizado!",

      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>¡Acceso Autorizado!</h2>

          <p>Hola <b>${nombre}</b>,</p>

          <p>Tu permiso de ingreso ha sido aprobado.</p>

          <hr/>

          <p><b>Código QR de acceso:</b></p>

          <img src="cid:qrcode" width="180" />

          <p>
            Código:
            <b>${codigoVisita}</b>
          </p>

          <p>Presenta este QR al ingresar.</p>
        </div>
      `,

      attachments: [
        {
          filename: "qr.png",
          content: qrBuffer,
          cid: "qrcode",
        },
      ],
    });

    console.log("📩 Correo enviado correctamente");

  } catch (error: any) {
    console.error("❌ Error enviando correo:", error.message);
  }
};
