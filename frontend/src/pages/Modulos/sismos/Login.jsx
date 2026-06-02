import ModuloLogin from "../../../components/ModuloLogin";
import { Users } from 'lucide-react';

export default function SismosLogin() {
  return (
    <ModuloLogin
  moduloNombre="Acceso Sismos"
  moduloIcon={<Users size={40} />}
  moduloKey="sismos"
  redirectPath={(user) => {

    if (
      user.rol ===
      "PERSONAL DE SEGURIDAD"
    ) {
      return "/sismos/dashboard";
    }

    if (
      user.rol ===
      "PERSONAL DE VIGILANCIA"
    ) {
      return "/sismos/dashboard";
    }

    if (
      user.rol ===
      "OPERADOR DE SEGURIDAD"
    ) {
      return "/sismos/dashboard";
    }

    return "/sismos/dashboard";

  }}
/>
  );
}