import { useState, useEffect } from "react";
import { useNoteContext } from "../context/NoteContext";
import { useThemeContext } from "../context/ThemeContext";

export default function NoteForm({ setShowForm, className = "", showToast }) {
  const { addNote, updateNote, editingNote } = useNoteContext();
  const { darkMode } = useThemeContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("personal");
  const isEditing = !!editingNote;

  // Populate form when editing a note
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCategory(editingNote.category);
    }
  }, [editingNote]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    if (isEditing) {
      updateNote({
        ...editingNote,
        title,
        content,
        category,
      });
      showToast && showToast("Note updated successfully", "success");
    } else {
      addNote({
        title,
        content,
        category,
      });
      showToast && showToast("Note added successfully", "success");
    }

    // Reset form and close it
    setTitle("");
    setContent("");
    setCategory("personal");
    setShowForm(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mb-6 ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-200"
      } border p-5 rounded-lg shadow-sm flex-shrink-0 ${className}`}
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          className="block w-full p-2 min-h-[120px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="flex gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              value="personal"
              checked={category === "personal"}
              onChange={() => setCategory("personal")}
              className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <span className="mr-1 text-xl">⭐</span>
            <span className="text-gray-700">Personal</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              value="business"
              checked={category === "business"}
              onChange={() => setCategory("business")}
              className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <span className="mr-1 text-xl">💼</span>
            <span className="text-gray-700">Business</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="mr-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
        >
          {isEditing ? "Update Note" : "Add Note"}
        </button>
      </div>
    </form>
  );
}
