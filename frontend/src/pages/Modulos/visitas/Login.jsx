import ModuloLogin from "../../../components/ModuloLogin";
import { Users } from 'lucide-react';

export default function VisitasLogin() {
  return (
    <ModuloLogin
      moduloNombre="Acceso Visitas"
      moduloIcon={<Users size={40} />}
      moduloKey="visitas"
      redirectPath="/visitas/dashboard"
    />
  );
}