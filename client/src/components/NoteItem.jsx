import { useNoteContext } from "../context/NoteContext";
import { useState, useRef, useEffect } from "react";

export default function NoteItem({ note, onEdit, showToast }) {
  const { deleteNote } = useNoteContext();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  function getCategoryIcon(category) {
    return category === "personal" ? "⭐" : "💼";
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      className={`group bg-white border-b border-gray-200 pb-5 pt-4 px-4 relative hover:bg-gray-50 transition-all duration-200 ${
        note.category === "personal"
          ? "border-l-4 border-l-purple-300"
          : "border-l-4 border-l-blue-300"
      }`}
    >
      <div className="flex">
        {/* Left Column with Icon */}
        <div
          className={`w-12 h-12 rounded-lg mr-4 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
            note.category === "personal"
              ? "bg-purple-50 text-purple-500"
              : "bg-blue-50 text-blue-500"
          }`}
        >
          <span className="text-xl">{getCategoryIcon(note.category)}</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden pr-6">
          <div className="font-medium text-gray-800 text-base group-hover:text-purple-700 transition-colors">
            {note.title}
          </div>
          <div className="text-gray-500 text-sm line-clamp-2 mt-1.5">
            {note.content}
          </div>
          <div className="text-gray-400 text-xs mt-2 flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {formatDate(note.createdAt)}
          </div>
        </div>
      </div>

      {/* Options button (three dots) - with improved hover */}
      <button
        className="absolute top-3 right-3 text-gray-400 p-1.5 rounded-full hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
        onClick={() => setShowMenu(!showMenu)}
        ref={buttonRef}
        aria-label="Note options"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {/* Edit/Delete buttons shown on click - Enhanced styling */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute right-3 top-9 flex flex-col bg-white rounded-lg shadow-lg z-10 border border-gray-100 overflow-hidden min-w-[120px] animate-fadeIn"
        >
          <button
            className="px-4 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 text-left text-sm font-medium transition-colors w-full flex items-center"
            onClick={() => {
              setShowMenu(false);
              onEdit(note);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
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
            Edit
          </button>
          <div className="border-t border-gray-100"></div>
          <button
            className="px-4 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 text-left text-sm font-medium transition-colors w-full flex items-center"
            onClick={() => {
              setShowMenu(false);
              deleteNote(note.id);
              showToast && showToast("Note deleted successfully", "success");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
