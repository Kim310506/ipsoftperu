import ModuloLogin from "../../../components/ModuloLogin";
import { BoxesIcon } from 'lucide-react'; 

export default function InventarioLogin() {
  return (
    <ModuloLogin
      moduloNombre="Acceso Inventarios"
      moduloIcon={<BoxesIcon size={40} />}
      moduloKey="inventario"
      redirectPath="/inventario/dashboard"
    />
  );
}