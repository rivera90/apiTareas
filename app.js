let express = require('express');
let bodyParser = require('body-parser');
let cors = require("cors")
let app = express();

//Rutas
let tarea_routes = require('./routes/TareaRoutes');


app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());

 app.use(cors({origin:true, credencials:true}))

app.use('/api',tarea_routes);
 
module.exports = app;
