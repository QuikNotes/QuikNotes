import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NoteList from "../components/NoteList";

export default function Home({ showToast }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [showShortcutHelp, setShowShortcutHelp] = useState(false);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowSidebar(true);
    }

    window.addEventListener("resize", handleResize);

    // Keyboard shortcuts
    function handleKeyDown(e) {
      // Ctrl/Cmd + / to show shortcut help
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        setShowShortcutHelp((prev) => !prev);
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden fixed inset-0">
      {/* Sidebar - Fixed position */}
      {showSidebar && (
        <div
          className={`${
            isMobile
              ? "fixed inset-0 z-40 bg-black bg-opacity-50"
              : "fixed left-0 top-0 bottom-0"
          } transition-all duration-300`}
          onClick={() => isMobile && setShowSidebar(false)}
        >
          <div
            className={`${
              isMobile ? "w-64" : "w-[90px]"
            } h-full z-50 transition-all duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[90px] h-full">
        {/* Top Navigation Bar */}
        <div className="bg-white h-16 flex justify-center items-center px-4 z-10 border-b border-gray-200 shadow-sm">
          {/* You could add a logo or heading here */}
          <h1 className="text-xl font-bold text-purple-700">QuikNotes</h1>
        </div>

        {/* Notes Content - Scrollable */}
        <div className="flex-1 bg-gray-50 p-4 md:p-6 overflow-hidden">
          <div className="max-w-3xl mx-auto h-full bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-auto">
            {isMobile && !showSidebar && (
              <button
                className="mb-4 p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 flex-shrink-0"
                onClick={() => setShowSidebar(true)}
                aria-label="Open sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
            {/* This handles scrolling */}
            <div className="flex-1 overflow-auto scrollbar-hide smooth-scroll">
              <div className="p-5 md:p-6">
                <NoteList showToast={showToast} />
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcut Help Modal */}
        {showShortcutHelp && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setShowShortcutHelp(false)}
          >
            <div
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Keyboard Shortcuts
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Show shortcuts</span>
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">
                    Ctrl + /
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Create new note</span>
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">
                    Ctrl + N
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Search notes</span>
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">
                    Ctrl + F
                  </span>
                </div>
              </div>
              <button
                className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => setShowShortcutHelp(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
