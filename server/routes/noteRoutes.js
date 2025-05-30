import express from 'express';
import { addNote } from '../controllers/noteController.js';

const router = express.Router();

// POST
router.post('/', addNote);

// GET may need to update endpoint names
// router.get('/', getAllNotes);

// GET /api/notes/:id 
// router.get('/:id', getNoteById);

// PUT /api/notes/:id
// router.put('/:id', updateNote);

// DELETE /api/notes/:id
// router.delete('/:id', deleteNote);

export default router;

