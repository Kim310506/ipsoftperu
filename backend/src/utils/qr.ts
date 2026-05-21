import QRCode from "qrcode";

export const generarQR = (data: string) => {
  return QRCode.toDataURL(data, {
    width: 250,
    margin: 2,
    errorCorrectionLevel: "H",
  });
};