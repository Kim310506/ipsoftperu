import ModuloLogin from "../../../components/ModuloLogin";
import { Users } from 'lucide-react';

export default function VisitasLogin() {
  return (
    <ModuloLogin
  moduloNombre="Acceso Incidentes"
  moduloIcon={<Users size={40} />}
  moduloKey="incidentes"
  redirectPath={(user) => {

    if (
      user.rol ===
      "SEGURIDAD DEL LOCAL"
    ) {
      return "/incidentes/dashboard?menu=programar";
    }

    if (
      user.rol ===
      "RESPONSABLE SECURITY"
    ) {
      return "/incidentes/dashboard?menu=autorizar";
    }

    if (
      user.rol ===
      "RESPONSABLE SAFETY"
    ) {
      return "/incidentes/dashboard?menu=consultas";
    }
    if (
      user.rol ===
      "ENCARGADO DE SOLUCIONAR SAFETY"
    ) {
      return "/incidentes/dashboard?menu=autorizar";
    }
    if (
      user.rol ===
      "ENCARGADO DE SOLUCIONAR SECURITY"
    ) {
      return "/incidentes/dashboard?menu=autorizar";
    }
    return "/incidentes/dashboard";

  }}
/>
  );
}
