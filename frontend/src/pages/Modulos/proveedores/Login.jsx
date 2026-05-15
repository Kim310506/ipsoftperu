import ModuloLogin from "../../../components/ModuloLogin";
import { Building2 } from 'lucide-react'; 

export default function ProveedoresLogin() {
  return (
    <ModuloLogin
      moduloNombre="Acceso Proveedores"
      moduloIcon={<Building2 size={40} />}
      moduloKey="proveedores"
      redirectPath="/proveedores/dashboard"
    />
  );
}