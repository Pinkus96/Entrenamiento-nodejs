require("../config/config");
const middleware = require('../libs/middleware');

const express = require('express');

const path = require("path");

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// ruta publica
app.use(require("./routes/login"));

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, "../public")));

//midleware
app.use(middleware.tokenValidator);

//Configuración global de rutas
app.use(require("./routes/index"));



app.listen(process.env.PORT, () => console.log("Escuchando el puerto: 3000"));