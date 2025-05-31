import { createContext, useContext, useState, useEffect } from "react";

const NoteContext = createContext();

export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [editingNote, setEditingNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to load notes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter notes based on active category and search query
  const filteredNotes = notes
    .filter(
      (note) => activeCategory === "all" || note.category === activeCategory
    )
    .filter(
      (note) =>
        searchQuery === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const addNote = async (newNote) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      const addedNote = await response.json();
      setNotes([addedNote, ...notes]);
    } catch (err) {
      setError("Failed to add note");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNote = async (updatedNote) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/notes/${updatedNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      const updated = await response.json();
      setNotes(
        notes.map((note) => (note.id === updated.id ? updated : note))
      );
      setEditingNote(null);
    } catch (err) {
      setError("Failed to update note");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      setError("Failed to delete note");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const editNote = (note) => {
    setEditingNote(note);
  };

  const value = {
    notes,
    filteredNotes,
    activeCategory,
    editingNote,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    setActiveCategory,
    addNote,
    updateNote,
    deleteNote,
    editNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
