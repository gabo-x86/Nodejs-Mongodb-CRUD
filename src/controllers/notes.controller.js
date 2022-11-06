const notesCtrl = {}

//Devuelve todas las notas
notesCtrl.renderNotes = (req, res) => {
    res.send('Render all notes :D');
}

//Pinta formulario
notesCtrl.renderNoteForm = (req, res) => {
    res.render('./notes/new-note');
}
//Crea nueva nota
notesCtrl.createNewNote = (req, res) => {
    //req.body catchea los campos del formulario
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