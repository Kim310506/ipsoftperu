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
      "PERSONAL DE SEGURIDAD (PSEG)"
    ) {
      return "/sismos/dashboard";
    }

    if (
      user.rol ===
      "PERSONAL DE VIGILANCIA (PVIG)"
    ) {
      return "/sismos/dashboard";
    }

    if (
      user.rol ===
      "OPERADOR DE SEGURIDAD (OSEG)"
    ) {
      return "/sismos/dashboard";
    }

    return "/sismos/dashboard";

  }}
/>
  );
}