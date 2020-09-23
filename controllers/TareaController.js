let Tarea = require('../models/TareaModel');
let moment = require('moment');

function prueba(req, res){
    res.status(200).send({
        message:'Esta ruta es de prueba'
    });
}

function GuardarTarea(req,res){
    let tarea = new Tarea();

    let params = req.body;

    if(params.titulo){
        
        tarea.titulo = params.titulo;
        tarea.subtitulo = params.subtitulo;
        tarea.estado = 1;
        tarea.diaCreado = moment().format('LLLL');
        tarea.diaModificacion = '';

        tarea.save((error, TareaStored)=>{
            if(error) return res.status(500).send({status:'error',result:'',message:'Error en el servidor'});

            if(TareaStored){
                return res.status(200).send({status:true,result:TareaStored,message:''});
            }else{
                return res.status(200).send({status:true,result:'',message:'No se guardo la tarea'});        
            }
        });
        
        
    }else{
        return res.status(200).send({status:true,result:'',message:'El titulo de la tarea es obligatorio'});
    }
}

function ObtenerTareas(req,res){
    const query = Tarea.where({estado: 1})
    query.find((error,tareas)=>{
        if(error) return res.status(500).send({status:'error',result:'',message:'Error en el servidor'});

        if(tareas.length >0){
           
            return res.status(200).send({
                status:true,
                result:tareas,
                message:''
            })
        }else{
            return res.status(404).send({
                status:true,
                result:'',
                message:'No hay tareas registradas.'
            })
        }
    })
}

function TareasFinalizadas(req,res){
    const query = Tarea.where({estado: 2})
    query.find((error,tareas)=>{
        if(error) return res.status(500).send({status:'error',result:'',message:'Error en el servidor'});

        if(tareas.length >0){
           
            return res.status(200).send({
                status:true,
                result:tareas,
                message:''
            })
        }else{
            return res.status(404).send({
                status:true,
                result:'',
                message:'No hay tareas registradas.'
            })
        }
    })
}

function ActualizarTarea(req,res){
    let tareaId = req.params.id;

    let update = req.body;
    
    let mensaje = "La tarea fue actualizada.";
    update.diaModificacion = moment().format('LLLL');

    if(update.estado == 2){
        mensaje = "Tarea terminada."
    }
    Tarea.findByIdAndUpdate(tareaId, update, {new:true},(error,tareaUpdate)=>{
        if(error) return res.status(500).send({status:'error',result:'',message:'Error en el servidor'});

        if(tareaUpdate){
            return res.status(200).send({
                status:true,
                result: [tareaUpdate],
                message:mensaje
            })
        }else{
            return res.status(404).send({
                status:true,
                result: '',
                message: 'La tarea no existe.'
            });
        }

    })
}

function EliminarTArea(req,res){
    let tareaid = req.params.id;

    Tarea.findByIdAndDelete(tareaid,(err,tareaRemovida)=>{
        if(err) return res.status(500).send({status:'error',result:'',message:'Error en el servidor'});

        if(tareaRemovida){
            return res.status(200).send({
                status: true,
                result: [tareaRemovida],
                message:''
            })
        }else{
            return res.status(404).send({
                status: true,
                result: '',
                message:'La tarea no existe'
            });
        }

    })
}
module.exports = {
    prueba,
    GuardarTarea,
    ObtenerTareas,
    ActualizarTarea,
    EliminarTArea,
    TareasFinalizadas
}