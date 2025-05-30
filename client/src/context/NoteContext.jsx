import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([
    // dummy data
    {
      id: 1,
      title: "Meeting with Client",
      content: "Discuss project timeline and deliverables",
      category: "business",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Shopping List",
      content: "Milk, eggs, bread, fruits",
      category: "personal",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Project Ideas",
      content: "Mobile app for task management with voice controls",
      category: "business",
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      title: "Birthday Gift Ideas",
      content: "Watch, book, gift card",
      category: "personal",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [editingNote, setEditingNote] = useState(null);

  // Filter notes based on active category
  const filteredNotes =
    activeCategory === "all"
      ? notes
      : notes.filter((note) => note.category === activeCategory);

  const addNote = (newNote) => {
    const noteWithId = {
      ...newNote,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setNotes([...notes, noteWithId]);
  };

  const updateNote = (updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setEditingNote(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (note) => {
    setEditingNote(note);
  };

  const value = {
    notes,
    filteredNotes,
    activeCategory,
    editingNote,
    setActiveCategory,
    addNote,
    updateNote,
    deleteNote,
    editNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
