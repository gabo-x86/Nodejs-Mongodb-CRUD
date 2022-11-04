const {Schema, model} = require('mongoose');

//Mapeamos esquema de datos que se serán los de la BD
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true //Añade fecha de creación y actualización
})

module.exports = model('Note', NoteSchema);//Exportamos modelo