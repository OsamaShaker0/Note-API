const express = require('express');
const {
  getAllNotes,
  createNotes,
  singleNote,
  updateNote,
  deleteNote,
} = require('../controllers/notes');
const router = express.Router();

router.route('/note').get(getAllNotes).post(createNotes);
router.route('/note/:id').get(singleNote).patch(updateNote).delete(deleteNote);

module.exports = router;
