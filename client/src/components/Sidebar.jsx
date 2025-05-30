import { useNoteContext } from "../context/NoteContext";

export default function Sidebar() {
  const { activeCategory, setActiveCategory } = useNoteContext();

  return (
    <aside className="w-[90px] min-h-screen bg-purple-50 flex flex-col items-center pt-16 border-r border-gray-200 shadow-sm">
      <div className="flex flex-col gap-2 items-center mb-8">
        <button
          className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all ${
            activeCategory === "all"
              ? "bg-purple-100 hover:bg-purple-200"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCategory("all")}
          aria-label="View all notes"
        >
          <span className="text-2xl">📋</span>
        </button>
        <span className="text-sm font-medium text-gray-600">All</span>
      </div>

      <div className="flex flex-col gap-2 items-center mb-8">
        <button
          className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all ${
            activeCategory === "personal"
              ? "bg-purple-100 hover:bg-purple-200"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCategory("personal")}
          aria-label="View personal notes"
        >
          <span className="text-2xl">⭐</span>
        </button>
        <span className="text-sm font-medium text-gray-600">Personal</span>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <button
          className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all ${
            activeCategory === "business"
              ? "bg-purple-100 hover:bg-purple-200"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCategory("business")}
          aria-label="View business notes"
        >
          <span className="text-2xl">💼</span>
        </button>
        <span className="text-sm font-medium text-gray-600">Business</span>
      </div>
    </aside>
  );
}
