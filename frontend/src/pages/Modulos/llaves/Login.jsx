import ModuloLogin from "../../../components/ModuloLogin";
import { Users } from 'lucide-react';

export default function LlavesLogin() {
  return (
    <ModuloLogin
  moduloNombre="Acceso Llaves"
  moduloIcon={<Users size={40} />}
  moduloKey="llaves"
  redirectPath={(user) => {
    return "/llaves/dashboard";

  }}
/>
  );
}