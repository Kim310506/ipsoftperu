import ModuloLogin from "../../../components/ModuloLogin";
import { Users } from 'lucide-react';

export default function ProveedoresLogin() {
  return (
    <ModuloLogin
  moduloNombre="Acceso Proveedores"
  moduloIcon={<Users size={40} />}
  moduloKey="proveedores"
  redirectPath={(user) => {
    return "/proveedores/dashboard";

  }}
/>
  );
}