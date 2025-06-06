import { useNoteContext } from "../context/NoteContext";
import { useThemeContext } from "../context/ThemeContext";

export default function NoteItem({ note, onEdit, showToast }) {
  const { deleteNote } = useNoteContext();
  const { darkMode } = useThemeContext();

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

  return (
    <div
      className={`group ${
        darkMode
          ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
          : "bg-white border-gray-200 hover:bg-gray-50"
      } border-b pb-5 pt-4 px-4 relative transition-all duration-200 ${
        note.category === "personal"
          ? "border-l-4 border-l-purple-300"
          : "border-l-4 border-l-blue-300"
      }`}
    >
      {/* Mobile-friendly touch target for the entire note */}
      <div
        className="absolute inset-0 z-10 md:hidden"
        onClick={() => onEdit(note)}
      ></div>

      <div className="flex">
        {/* Left Column with Icon */}
        <div
          className={`w-12 h-12 rounded-lg mr-4 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
            note.category === "personal"
              ? darkMode
                ? "bg-purple-900 text-purple-300"
                : "bg-purple-50 text-purple-500"
              : darkMode
              ? "bg-blue-900 text-blue-300"
              : "bg-blue-50 text-blue-500"
          }`}
        >
          <span className="text-xl">{getCategoryIcon(note.category)}</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden pr-10">
          <div
            className={`font-medium ${
              darkMode
                ? "text-white group-hover:text-purple-300"
                : "text-gray-800 group-hover:text-purple-700"
            } text-base transition-colors`}
          >
            {note.title}
          </div>
          <div
            className={`${
              darkMode ? "text-gray-300" : "text-gray-500"
            } text-sm line-clamp-2 mt-1.5`}
          >
            {note.content}
          </div>
          <div
            className={`${
              darkMode ? "text-gray-400" : "text-gray-400"
            } text-xs mt-2 flex items-center`}
          >
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

        {/* Desktop: Action buttons that appear on hover with smooth animation */}
        <div className="absolute right-4 top-4 hidden md:flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className={`p-1.5 rounded-full ${
              darkMode
                ? "bg-gray-600 hover:bg-purple-900 text-gray-300 hover:text-purple-300"
                : "bg-gray-50 hover:bg-purple-100 text-gray-500 hover:text-purple-600"
            } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm animate-popIn`}
            aria-label="Edit note"
            title="Edit note"
            style={{ animationDelay: "0.05s" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note.id);
              showToast && showToast("Note deleted successfully", "success");
            }}
            className={`p-1.5 rounded-full ${
              darkMode
                ? "bg-gray-600 hover:bg-red-900 text-gray-300 hover:text-red-300"
                : "bg-gray-50 hover:bg-red-100 text-gray-500 hover:text-red-600"
            } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-sm animate-popIn`}
            aria-label="Delete note"
            title="Delete note"
            style={{ animationDelay: "0.1s" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
          </button>
        </div>

        {/* Mobile: Always visible action button */}
        <div className="absolute right-4 top-4 flex md:hidden items-center z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note.id);
              showToast && showToast("Note deleted successfully", "success");
            }}
            className={`p-1.5 ${
              darkMode ? "text-red-300" : "text-red-500"
            } focus:outline-none`}
            aria-label="Delete note"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </button>
        </div>
      </div>
    </div>
  );
}
