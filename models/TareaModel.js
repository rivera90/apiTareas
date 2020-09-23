let mongoose = require('mongoose');


let Schema = mongoose.Schema;

let TareaSchema = Schema({
    titulo:String,
    subtitulo: String,
    estado:Number,
    diaCreado: String,
    diaModificacion: String
});

module.exports = mongoose.model('Tarea', TareaSchema);