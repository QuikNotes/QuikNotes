import { useState } from "react";
import NoteForm from "./NoteForm";

const initialNotes = [
  {
    id: 1,
    title: "Grocery List",
    desc: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
  },
  {
    id: 2,
    title: "Favorite Shows",
    desc: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
  },
];

export default function NoteList() {
  const [notes, setNotes] = useState(initialNotes);

  function handleAdd(note) {
    setNotes([{ ...note, id: Date.now() }, ...notes]);
  }

  function handleDelete(id) {
    setNotes(notes.filter(note => note.id !== id));
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      <div className="mb-2 text-gray-500 font-semibold">Recently Edited &rarr;</div>
      <NoteForm onAdd={handleAdd} />
      <ul className="space-y-3">
        {notes.map(note => (
          <li
            key={note.id}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-semibold">{note.title}</div>
              <div className="text-gray-500 text-sm">{note.desc}</div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-purple-500 hover:underline"
                onClick={() => {/* handle edit */}}
              >
                Edit
              </button>
              <button
                className="text-red-400 hover:text-red-600"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
