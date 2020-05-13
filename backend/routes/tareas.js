const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');


let app = express();
let Tarea = require('../models/tarea');


// ===========================
//  Obtener tareas
// ===========================
app.get('/tareas', verificaToken, (req, res) => {
    // trae todos los tareas
    // populate: usuario tarea
    // paginado
    
    let desde = req.query.desde || 0;
    desde = Number(desde);
    

    Tarea.find({ disponible: true,usuario: req.usuario._id})
        .skip(desde)
        .limit(50)
        .populate('usuario', 'nombre email')
        .populate('tarea', 'descripcion')
        .exec((err, tareas) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            
            res.json({
                ok: true,
                tareas
            });
        })

});

// ===========================
//  Obtener Tarea por ID
// ===========================
app.get('/tareas/:id', (req, res) => {
    // populate: usuario tarea
    // paginado
    let id = req.params.id;

    Tarea.findById(id)
        .populate('usuario', 'nombre email')
        .populate('tarea', 'nombre')
        .exec((err, tareaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!tareaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                tarea: tareaDB
            });

        });

});

// ===========================
//  Buscar tareas
// ===========================
app.get('/tareas/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Tarea.find({ nombre: regex , usuario: req.usuario._id})
        .populate('tareas', 'nombre')
        .exec((err, tareas) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tareas
            })

        })


});



// ===========================
//  Crear nueva tarea
// ===========================
app.post('/tareas', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una tarea del listado 

    let body = req.body;

    let tarea = new Tarea({
        usuario: req.usuario._id,
        nombre: body.nombre,
        descripcion: body.descripcion,
        disponible: body.disponible,
    });

    tarea.save((err, tareaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            tarea: tareaDB
        });

    });

});

// ===========================
//  Actualizar Tarea
// ===========================
app.put('/tareas/:id', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una tarea al listado 

    let id = req.params.id;
    let body = req.body;

    Tarea.findById(id, (err, tareaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!tareaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        tareaDB.nombre = body.nombre;
        tareaDB.disponible = body.disponible;
        tareaDB.descripcion = body.descripcion;

        tareaDB.save((err, tareaGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tarea: tareaGuardado
            });

        });

    });


});

// ===========================
//  Borrar tarea
// ===========================
app.delete('/tareas/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Tarea.findById(id, (err, tareaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!tareaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        tareaDB.disponible = false;

        tareaDB.save((err, tareaBorrada) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tarea: tareaBorrada,
                mensaje: 'Tarea Eliminada'
            });

        })

    })

});

module.exports = app;