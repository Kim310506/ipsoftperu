import ModuloLogin from "../../../components/ModuloLogin";
import { ShieldAlert } from "lucide-react";

export default function RiesgosLogin() {
  return (
    <ModuloLogin
      moduloNombre="Acceso Gestión de Riesgos"
      moduloIcon={<ShieldAlert size={40} />}
      moduloKey="riesgos"
      redirectPath={(user) => {

        if (
          user.rol ===
          "JEFE DE SEGURIDAD"
        ) {
          return "/riesgos/dashboard?menu=inicio";
        }

        if (
          user.rol ===
          "RESPONSABLE CATEGORIA"
        ) {
          return "/riesgos/dashboard?menu=inicio";
        }

        return "/riesgos/dashboard";

      }}
    />
  );
}