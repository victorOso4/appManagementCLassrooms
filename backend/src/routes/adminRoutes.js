const express        = require('express');
const router         = express.Router();
const asignaturaController = require('../controllers/asignaturaController');
const AulaController = require('../controllers/aulaController');
const UbicacionController = require('../controllers/locationController');


router.post('/asignaturas', asignaturaController.createAsignatura);
router.get('/asignaturas', asignaturaController.getAsignaturas);
router.put('/asignaturas/:id_asignatura', asignaturaController.updateAsignatura);
router.delete('/asignaturas/:id_asignatura', asignaturaController.deleteAsignatura);
router.get('/asignaturas/opciones', asignaturaController.getDocentesEstudiantes);

router.post('/aulas', AulaController.createAula);
router.get('/aulas', AulaController.getAulas);
router.put('/aulas/:id_aula', AulaController.updateAula);
router.delete('/aulas/:id_aula', AulaController.deleteAula);

router.post('/ubicacion', UbicacionController.createUbicacion);
router.get('/ubicacion', UbicacionController.getUbicaciones);
router.put('/ubicacion/:id_ubicacion', UbicacionController.updateUbicacion);
router.delete('/ubicacion/:id_ubicacion', UbicacionController.deleteUbicacion);


module.exports = router;