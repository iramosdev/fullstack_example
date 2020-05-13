const express = require('express');
const path = require('path');
const app = express();

app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./tareas'));

module.exports = app;