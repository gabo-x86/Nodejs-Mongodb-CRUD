const {Router} = require('express');
const router = Router();
const { renderNoteForm, 
        createNewNote, 
        renderNotes,
        renderEditForm,
        updateNote,
        deleteNote} = require('../controllers/notes.controller');

router.get('/notes', renderNotes);
router.get('/notes/add', renderNoteForm);
router.post('/notes/new-note', createNewNote);  //Necesita mostrar mensaje

router.get('/notes/edit/:id', renderEditForm);
router.put('/notes/edit/:id', updateNote);      //Necesita mostrar mensaje
router.delete('/notes/delete/:id', deleteNote); //Necesita mostrar mensaje
module.exports = router;