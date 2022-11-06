const notesCtrl = {}
const Note = require('../models/Note'); //Importamos modelo de Nota de BD


//Devuelve todas las notas
notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find().lean();
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
    await newNote.save();                                 //Guarda objeto en la BD
    console.log(newNote);
    res.send('Note was created (POST)');
}


//Pinta formulario para editar nota
notesCtrl.renderEditForm = (req, res) => {
    res.send('Render update-note form!');
}


//Cambia valores de una nota (lo edita)
notesCtrl.updateNote = (req, res) => {
    res.send('Update note :P');
}


//Elimina nota
notesCtrl.deleteNote = (req, res) =>{
    res.send('Deleting note :(');
}


module.exports = notesCtrl;