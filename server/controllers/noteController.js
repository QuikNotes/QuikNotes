import Note from '../models/Note.js';

export const addNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }
    const note = await Note.create({ title, content, category });
    res.status(201).json(note);
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ error: 'Failed to add note.' });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes.' });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Failed to fetch note.' });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const note = await Note.findByPk(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found.' });
    }

    await note.update({ title, content, category });
    res.status(200).json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Failed to update note.' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found.' });
    }

    await note.destroy();
    res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note.' });
  }
};
