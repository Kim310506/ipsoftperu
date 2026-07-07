import ModuloLogin from "../../../components/ModuloLogin";
import { Users } from 'lucide-react';

export default function RondasLogin() {
  return (
    <ModuloLogin
  moduloNombre="Acceso Rondas"
  moduloIcon={<Users size={40} />}
  moduloKey="rondas"
  redirectPath={(user) => {
    return "/rondas/dashboard";

  }}
/>
  );
}