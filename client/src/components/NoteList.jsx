import { useState } from "react";
import NoteForm from "./NoteForm";
import NoteItem from "./NoteItem";
import { useNoteContext } from "../context/NoteContext";

export default function NoteList({ showToast }) {
  const {
    filteredNotes,
    editNote,
    activeCategory,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
  } = useNoteContext();
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center mb-4 md:mb-6 flex-shrink-0 flex-wrap gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Notes
        </h1>
        <div className="ml-auto flex gap-2">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors shadow-sm font-medium dark:bg-purple-700 dark:hover:bg-purple-800 text-sm"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Note"}
          </button>
        </div>
      </div>

      <div className="mb-6 text-gray-600 dark:text-gray-300 font-semibold flex items-center text-lg flex-shrink-0">
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

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full p-2.5 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-purple-600 dark:placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {showForm && (
        <NoteForm
          setShowForm={setShowForm}
          showToast={showToast}
          className="flex-shrink-0"
        />
      )}

      <div className="flex flex-col flex-1 overflow-auto scrollbar-hide smooth-scroll scrollable-content">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 dark:border-purple-400"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500 dark:text-red-400">
            {error}
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="inline-block p-3 bg-purple-50 dark:bg-purple-900 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-purple-500 dark:text-purple-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15.1l-3.414.586.586-3.414 9.586-9.586z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
              No notes found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery
                ? "Try a different search term"
                : "Create your first note to get started!"}
            </p>
            {!searchQuery && (
              <button
                className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-sm dark:bg-purple-700 dark:hover:bg-purple-800 xs:px-3 xs:py-1.5 xs:text-sm"
                onClick={() => setShowForm(true)}
              >
                Create Note
              </button>
            )}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              showToast={showToast}
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
