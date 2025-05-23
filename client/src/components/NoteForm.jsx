import { useState } from "react";

export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, desc });
    setTitle("");
    setDesc("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow flex gap-2">
      <input
        className="block w-1/4 p-2 border rounded"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="block w-1/2 p-2 border rounded"
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />
      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Add Note
      </button>
    </form>
  );
}
