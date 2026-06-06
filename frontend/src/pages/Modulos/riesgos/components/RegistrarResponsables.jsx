import { useState } from "react";
import api from "../../../../api/axios";
import { X } from "lucide-react";

export default function RegistrarResponsable({
  open,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    area: "",
    categoria: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardar = async () => {
    try {
      await api.post(
        "/riesgos/responsables",
        form
      );

      alert(
        "Responsable registrado correctamente"
      );

      onSaved();
      onClose();

    } catch (error) {
      console.log(error);

      alert(
        "Error al registrar responsable"
      );
    }
  };

const inputStyle = {
  width: "100%",
  height: "48px",
  padding: "0 14px",
  borderRadius: "12px",
  border: "1px solid #dbe2ea",
  outline: "none",
  fontSize: "14px",
  background: "#fff",
  boxSizing: "border-box",
};

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: "760px",
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow:
            "0 25px 60px rgba(0,0,0,.20)",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "#fff",
            padding: "20px 25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h5
              style={{
                margin: 0,
                fontWeight: 700,
              }}
            >
              Registrar Responsable
            </h5>

            <small
              style={{
                opacity: 0.85,
              }}
            >
              Complete los datos del responsable
            </small>
          </div>

          <X
            size={22}
            style={{
              cursor: "pointer",
            }}
            onClick={onClose}
          />
        </div>

        {/* BODY */}
<div
  style={{
    padding: "28px",
    background: "#fafafa",
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(3, minmax(0, 1fr))",
      gap: "20px",
    }}
  >
    <div>
      <label style={labelStyle}>
        Nombre
      </label>

      <input
        type="text"
        name="nombre"
        style={inputStyle}
        value={form.nombre}
        onChange={handleChange}
      />
    </div>

    <div>
      <label style={labelStyle}>
        Apellido Paterno
      </label>

      <input
        type="text"
        name="apellidoPaterno"
        style={inputStyle}
        value={form.apellidoPaterno}
        onChange={handleChange}
      />
    </div>

    <div>
      <label style={labelStyle}>
        Apellido Materno
      </label>

      <input
        type="text"
        name="apellidoMaterno"
        style={inputStyle}
        value={form.apellidoMaterno}
        onChange={handleChange}
      />
    </div>

    <div>
      <label style={labelStyle}>
        Correo Electrónico
      </label>

      <input
        type="email"
        name="correo"
        style={inputStyle}
        value={form.correo}
        onChange={handleChange}
      />
    </div>

    <div>
      <label style={labelStyle}>
        Área
      </label>

      <input
        type="text"
        name="area"
        style={inputStyle}
        value={form.area}
        onChange={handleChange}
      />
    </div>

    <div
      style={{
        gridColumn: "1 / -1",
      }}
    >
      <label style={labelStyle}>
        Categoría
      </label>

      <select
        name="categoria"
        style={inputStyle}
        value={form.categoria}
        onChange={handleChange}
      >
        <option value="">
          Seleccionar categoría
        </option>

        <option value="FÍSICA">
          FÍSICA
        </option>

        <option value="HUMANA">
          HUMANA
        </option>

        <option value="TECNOLÓGICA">
          TECNOLÓGICA
        </option>

        <option value="PROCEDIMIENTOS">
          PROCEDIMIENTOS
        </option>
      </select>
    </div>
  </div>
</div>

        {/* FOOTER */}
        <div
          style={{
            padding: "20px 25px",
            borderTop:
              "1px solid #edf2f7",
            background: "#fff",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              border: "none",
              padding: "10px 22px",
              borderRadius: "12px",
              background: "#f1f5f9",
              color: "#475569",
              fontWeight: 600,
            }}
          >
            Cancelar
          </button>

          <button
            onClick={guardar}
            style={{
              border: "none",
              padding: "10px 24px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "#fff",
              fontWeight: 600,
              boxShadow:
                "0 8px 20px rgba(37,99,235,.30)",
            }}
          >
            Guardar Responsable
          </button>
        </div>
      </div>
    </div>
  );
}