
//Cargar modulo mongoose para conectar con MongoDB
let mongoose = require('mongoose');

let app = require('./app');

mongoose.Promise = global.Promise;

let port = 3800;

//Conectar a BD
mongoose.connect('mongodb://localhost:27017/Tareas',{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify: false})
        .then(()=>{
            console.log('La conexión a MongoDB se realizó con éxito!!')
            
            app.listen(port, ()=>{
                console.log('Servidor corriendo en puerto 3800');
            });
        })
        .catch(err => console.log(err));