import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import api from "../../../../api/axios";

export default function ScannerProveedores({ onClose, onSuccess }) {
  const scannerRef = useRef(null);
  const isRunning = useRef(false);

  useEffect(() => {
    let html5QrCode;
    let mounted = true;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;

        const cameras = await Html5Qrcode.getCameras();
        if (!cameras?.length || !mounted) return;

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: 250,
          },
          async (decodedText) => {
            if (!isRunning.current) return;

            isRunning.current = false;

            try {
              await html5QrCode.stop();
              await html5QrCode.clear();
             const cleaned = decodedText.trim().replace(/\n/g, "");
           const res = await api.post("/contratasinhouse/verificar-qr", {
  qrData: decodedText,
});

const trabajador = res?.data;

if (!trabajador) {
  alert("❌ QR inválido");
  return;
}

onSuccess(trabajador);
onClose();

            } catch (err) {
              console.log("QR inválido", err);
              alert("❌ QR inválido");
            }
          }
        );

        isRunning.current = true;

      } catch (err) {
        console.log("Error cámara:", err);
      }
    };

    startScanner();

    return () => {
      mounted = false;

      if (scannerRef.current && isRunning.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current.clear().catch(() => {});
        isRunning.current = false;
      }
    };
  }, []);

  return (
    <div className="p-4">
      <div
        id="reader"
        style={{ width: "100%", minHeight: "300px" }}
      />
    </div>
  );
}