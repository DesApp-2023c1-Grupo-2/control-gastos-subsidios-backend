import express from 'express';
import { getUsuariosIdProyecto, getAllUsuariosProyectos, postUsuarioProyecto, } from '../controllers/usuariosproyectos_controller';

const router = express.Router();

// para poder probarlas, ej.: GET en http://localhost:3001/api/usuariosproyectos/buscaridproyecto/1
router.get('/buscaridproyecto/:idProyecto', getUsuariosIdProyecto);

// para poder probarlas, ej.: GET en http://localhost:3001/api/usuariosproyectos/buscartodos
router.get('/buscartodos', getAllUsuariosProyectos);

// para probar ej.: http://localhost:3001/api/usuariosproyectos/postUsuarioXProyecto/3/1
router.post('/postUsuarioXProyecto/:idUsuario/:idProyecto', postUsuarioProyecto);

export default router;