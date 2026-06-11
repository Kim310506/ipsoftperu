import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./modules/administracion/users/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import ambienteRoutes from "./modules/administracion/infraestructura/ambientes/ambiente.routes";
import unidadRoutes from "./modules/administracion/infraestructura/uunn/unidad.routes";
import sedeRoutes from "./modules/administracion/infraestructura/sedes/sede.routes";
import pisoRoutes from "./modules/administracion/infraestructura/pisos/piso.routes";
import zonalesRoutes from "./modules/administracion/infraestructura/zonales/zonal.routes";
import pabellonRoutes from "./modules/administracion/infraestructura/pabellones/pabellon.routes";
import visitasRoutes from "./modules/visitas/visitas/visita.routes";
import visitantesRoutes from "./modules/visitas/visitantes/visitante.routes";
import incidentesRoutes from "./modules/incidentes/incidentes.routes";
import sismosRoutes from "./modules/sismos/sismos.routes";
import riesgosRoutes from "./modules/riesgos/riesgos.routes";
import proveedoresRoutes from "./modules/proveedores/contratas/contrata.routes";


const app = express();
/* ========================= */
/* CORS */
/* ========================= */

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/ambientes", ambienteRoutes);
app.use("/api/auth", authRoutes);
app.use("/unidades", unidadRoutes);
app.use("/sedes", sedeRoutes);
app.use("/pisos", pisoRoutes);
app.use("/zonales", zonalesRoutes);
app.use( "/pabellones",pabellonRoutes);
app.use( "/visitas",visitasRoutes);
app.use( "/visitantes",visitantesRoutes);
app.use( "/incidentes",incidentesRoutes);
app.use( "/sismos",sismosRoutes);
app.use( "/riesgos",riesgosRoutes);
app.use( "/contratas",proveedoresRoutes);

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
  
);export default app;