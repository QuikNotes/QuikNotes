import { useState } from "react";
import NoteForm from "./NoteForm";
import NoteItem from "./NoteItem";
import { useNoteContext } from "../context/NoteContext";

export default function NoteList() {
  const { filteredNotes, editNote, activeCategory } = useNoteContext();
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-gray-800">Notes</h1>
        <div className="ml-auto flex gap-2">
          <button
            className="bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors shadow-sm font-medium"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Note"}
          </button>
        </div>
      </div>

      <div className="mb-6 text-gray-600 font-semibold flex items-center text-lg flex-shrink-0">
        {activeCategory === "all"
          ? "All Notes"
          : activeCategory === "personal"
          ? "Personal Notes"
          : "Business Notes"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {showForm && (
        <NoteForm setShowForm={setShowForm} className="flex-shrink-0" />
      )}

      <div className="flex flex-col flex-1 overflow-auto scrollbar-hide smooth-scroll">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No notes found. Create a new note to get started!
          </div>
        ) : (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onEdit={(note) => {
                editNote(note);
                setShowForm(true);
              }}
            />
          ))
        )}
      </div>
    </section>
  );
}
