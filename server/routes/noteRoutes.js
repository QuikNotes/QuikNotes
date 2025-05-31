import express from 'express';
import { addNote, getAllNotes, getNoteById, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

// POST
router.post('/', (req, res) => {
  console.log('POST request received:', req.body);
  addNote(req, res);
});

// GET all notes
router.get('/', (req, res) => {
  console.log('GET all notes request received');
  getAllNotes(req, res);
});

// GET note by id
router.get('/:id', (req, res) => {
  console.log('GET note by id request received:', req.params.id);
  getNoteById(req, res);
});

// PUT update note
router.put('/:id', (req, res) => {
  console.log('PUT request received for id:', req.params.id, 'with data:', req.body);
  updateNote(req, res);
});

// DELETE note
router.delete('/:id', (req, res) => {
  console.log('DELETE request received for id:', req.params.id);
  deleteNote(req, res);
});

export default router;
