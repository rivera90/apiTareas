
let express = require('express');

let TareaController = require('../controllers/TareaController');

let api = express.Router();

api.get('/prueba', TareaController.prueba);

api.get('/tareas', TareaController.ObtenerTareas);
api.get('/tareasCerradas', TareaController.TareasFinalizadas);
api.post('/tarea',TareaController.GuardarTarea);
api.put('/tarea/:id',TareaController.ActualizarTarea);
api.delete('/tarea/:id',TareaController.EliminarTArea);

module.exports = api;