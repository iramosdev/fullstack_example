var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productoSchema = new Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre es necesario'] 
    },
    descripcion: { 
        type: String, 
        required: [true, 'La descripción es necesaria'] 
    },
    disponible: { 
        type: Boolean, 
        required: true, default: true 
    },
    usuario: { 
        type: Schema.Types.ObjectId, ref: 'Usuario' 
    }
});


module.exports = mongoose.model('Tareas', productoSchema);