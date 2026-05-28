import ModuloLogin from "../../../components/ModuloLogin";
import { Users } from 'lucide-react';

export default function VisitasLogin() {
  return (
    <ModuloLogin
  moduloNombre="Acceso Visitas"
  moduloIcon={<Users size={40} />}
  moduloKey="visitas"
  redirectPath={(user) => {

    if (
      user.rol ===
      "SOLICITANTE DE ACCESO (SA)"
    ) {
      return "/visitas/dashboard?menu=programar";
    }

    if (
      user.rol ===
      "RESPONSABLE DE AREA (RA)"
    ) {
      return "/visitas/dashboard?menu=autorizar";
    }

    if (
      user.rol ===
      "RECEPCION DE SEGURIDAD (REC)"
    ) {
      return "/visitas/dashboard?menu=consultas";
    }

    return "/visitas/dashboard";

  }}
/>
  );
}