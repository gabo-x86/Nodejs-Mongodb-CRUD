const {Router} = require('express');
const router = Router();
const { renderNoteForm, 
        createNewNote, 
        renderNotes,
        renderEditForm,
        updateNote,
        deleteNote} = require('../controllers/notes.controller');

const {isAuthenticated} = require('../helpers/auth');

router.get('/notes', isAuthenticated, renderNotes);              //Ruta protegida con middleware "isAuthenticated"
router.get('/notes/add', isAuthenticated, renderNoteForm);       //Ruta protegida con middleware "isAuthenticated"
router.post('/notes/new-note', isAuthenticated, createNewNote);  //Necesita mostrar mensaje, Ruta protegida con middleware "isAuthenticated"

router.get('/notes/edit/:id', isAuthenticated, renderEditForm);  //Ruta protegida con middleware "isAuthenticated"
router.put('/notes/edit/:id', isAuthenticated, updateNote);      //Necesita mostrar mensaje
router.delete('/notes/delete/:id', isAuthenticated, deleteNote); //Necesita mostrar mensaje
module.exports = router;