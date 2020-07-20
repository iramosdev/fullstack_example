require('./config/config');


const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//============Documentación de api======================
const path = require('path');
app.use('/apidoc',express.static(path.join(__dirname, 'docs/apidoc')));
//==================================

// Configuración global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB,
                                    { 
                                        useNewUrlParser: true,
                                        useCreateIndex:true,
                                        useUnifiedTopology:true 
                                    }, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});