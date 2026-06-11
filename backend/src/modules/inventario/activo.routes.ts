import { Router } from 'express';
import multer from 'multer';

// 1. Importamos el controlador desde la MISMA carpeta
import { 
  getActivos, 
  createActivo, 
  updateEstadoActivo, 
  updateActivo,
  importarActivosExcel,
  subirFotoController,
  exportarActivosExcel,
  darDeBajaActivo,
  obtenerHistorialBajas
} from './activo.controller'; // (Añade .js al final si tu TS te lo exige)

const router = Router();

// 2. Configuramos Multer en memoria (OBLIGATORIO para enviar a Google Cloud Storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Límite de 5MB por foto
  },
});

// 3. Definimos todas las rutas incluyendo "/activos" en el nombre
router.get('/activos', getActivos);          
router.post('/activos', upload.single('foto'), createActivo);       
router.put('/activos/:id', upload.single('foto'), updateActivo);
router.patch('/activos/:id/estado', updateEstadoActivo);    
router.post('/activos/:id/baja', upload.single('foto'), darDeBajaActivo);
router.get('/activos/historial-bajas', obtenerHistorialBajas);

router.post('/activos/importar', upload.single('file'), importarActivosExcel); 
router.get('/activos/exportar/excel', exportarActivosExcel);
router.post('/activos/:id/foto', upload.single('foto'), subirFotoController);

export default router;