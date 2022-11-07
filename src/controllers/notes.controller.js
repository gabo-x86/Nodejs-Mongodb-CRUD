const notesCtrl = {}
const Note = require('../models/Note'); //Importamos modelo de Nota de BD


//Devuelve todas las notas
notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find().lean(); //Importante añadir método lean() para que funcione
    res.render('notes/all-notes', {notes});
}


//Pinta formulario
notesCtrl.renderNoteForm = (req, res) => {
    res.render('./notes/new-note');
}


//Crea nueva nota
notesCtrl.createNewNote = async (req, res) => {
    //req.body catchea los campos del formulario
    const {title, description} = req.body;          //Usamos destructuring para catchear los campos
    const newNote = new Note({title, description}); //Es lo mismo que {title:title, description:description}
    await newNote.save();                           //Guarda objeto en la BD
    res.redirect('/notes');
}


//Pinta formulario para editar nota
notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean(); //Importante añadir método lean() para que funcione
    res.render('./notes/edit-notes', { note });             //Pasamos obj por parámetro a la vista
}


//Cambia valores de una nota (lo edita)
notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title:title, description:description});
    res.redirect('/notes');
}


//Elimina nota
notesCtrl.deleteNote = async (req, res) =>{
    await Note.findByIdAndDelete(req.params.id); //req.params devuelve los params de la url enviada
    res.redirect('/notes');
}


module.exports = notesCtrl;