import ModuloLogin from "../../../components/ModuloLogin";
import { Users } from 'lucide-react';

export default function ProveedoresLogin() {
  return (
    <ModuloLogin
  moduloNombre="Acceso Proveedores Inhouse"
  moduloIcon={<Users size={40} />}
  moduloKey="inhouse"
  redirectPath={(user) => {
    return "/proveedoresinhouse/dashboard";

  }}
/>
  );
}