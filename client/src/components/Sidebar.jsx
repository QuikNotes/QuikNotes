export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-purple-100 p-6 flex flex-col">
      <button className="mb-8 flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
        <span>📝</span>
        New
      </button>
      <nav className="flex flex-col gap-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-200">
          <span>⭐</span>
          Personal
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-200">
          <span>💼</span>
          Business
        </button>
      </nav>
    </aside>
  )
}
