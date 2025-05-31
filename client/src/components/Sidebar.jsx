import { useNoteContext } from "../context/NoteContext";

export default function Sidebar() {
  const { activeCategory, setActiveCategory, notes } = useNoteContext();

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

      {/* Settings button (for future) */}
      <div className="mt-auto mb-6">
        <button
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-600 text-white hover:bg-purple-500 transition-all"
          aria-label="Settings"
        >
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}
