import { useNoteContext } from "../context/NoteContext";
import { useThemeContext } from "../context/ThemeContext";

export default function Sidebar() {
  const { activeCategory, setActiveCategory, notes } = useNoteContext();
  const { darkMode, toggleDarkMode } = useThemeContext();

  // Count notes by category
  const personalCount = notes.filter(
    (note) => note.category === "personal"
  ).length;
  const businessCount = notes.filter(
    (note) => note.category === "business"
  ).length;

  return (
    <aside className="w-[90px] min-h-screen bg-purple-700 flex flex-col items-center pt-10 shadow-lg">
      <div className="flex flex-col gap-5 items-center w-full">
        <div className="flex flex-col gap-1 items-center w-full">
          <button
            className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all ${
              activeCategory === "all"
                ? "bg-white text-purple-700"
                : "bg-purple-600 text-white hover:bg-purple-500"
            }`}
            onClick={() => setActiveCategory("all")}
            aria-label="View all notes"
          >
            <span className="text-2xl mb-1">📋</span>
            <span className="text-xs font-medium">{notes.length}</span>
          </button>
          <span className="text-xs font-medium text-purple-100 mt-1">All</span>
        </div>

        <div className="flex flex-col gap-1 items-center w-full">
          <button
            className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all ${
              activeCategory === "personal"
                ? "bg-white text-purple-700"
                : "bg-purple-600 text-white hover:bg-purple-500"
            }`}
            onClick={() => setActiveCategory("personal")}
            aria-label="View personal notes"
          >
            <span className="text-2xl mb-1">⭐</span>
            <span className="text-xs font-medium">{personalCount}</span>
          </button>
          <span className="text-xs font-medium text-purple-100 mt-1">
            Personal
          </span>
        </div>

        <div className="flex flex-col gap-1 items-center w-full">
          <button
            className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all ${
              activeCategory === "business"
                ? "bg-white text-purple-700"
                : "bg-purple-600 text-white hover:bg-purple-500"
            }`}
            onClick={() => setActiveCategory("business")}
            aria-label="View business notes"
          >
            <span className="text-2xl mb-1">💼</span>
            <span className="text-xs font-medium">{businessCount}</span>
          </button>
          <span className="text-xs font-medium text-purple-100 mt-1">
            Business
          </span>
        </div>
      </div>

      {/* Settings and Dark Mode Toggle */}
      <div className="mt-auto mb-6 flex flex-col items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-600 text-white hover:bg-purple-500 transition-all"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </aside>
  );
}
