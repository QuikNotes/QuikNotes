import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NoteList from "../components/NoteList";
import { useThemeContext } from "../context/ThemeContext";

export default function Home({ showToast }) {
  const [showShortcutHelp, setShowShortcutHelp] = useState(false);
  const { darkMode } = useThemeContext();

  useEffect(() => {
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
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } flex overflow-hidden fixed inset-0 transition-colors duration-300`}
    >
      {/* Sidebar - Always visible */}
      <div className="fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 mobile-sidebar">
        <div className="w-[90px] h-full z-50">
          <Sidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[90px] h-full mobile-content-area scrollable-content mobile-content">
        {/* Top Navigation Bar */}
        <div
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } h-16 flex justify-center items-center px-4 z-10 border-b shadow-sm transition-colors duration-300`}
        >
          {/* You could add a logo or heading here */}
          <h1
            className={`text-xl font-bold ${
              darkMode ? "text-purple-400" : "text-purple-700"
            }`}
          >
            QuikNotes
          </h1>
        </div>

        {/* Notes Content - Scrollable */}
        <div
          className={`flex-1 ${
            darkMode ? "bg-gray-800" : "bg-gray-50"
          } p-4 md:p-6 overflow-hidden transition-colors duration-300`}
        >
          <div
            className={`w-full mx-auto h-full ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-100"
            } rounded-xl shadow-md border flex flex-col overflow-auto transition-colors duration-300`}
          >
            {/* Remove the hamburger menu button since sidebar is always visible */}

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
              className={`${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              } rounded-lg shadow-xl p-6 max-w-md w-full transition-colors duration-300`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                } mb-4`}
              >
                Keyboard Shortcuts
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Show shortcuts
                  </span>
                  <span
                    className={`font-mono ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } px-2 py-0.5 rounded text-sm`}
                  >
                    Ctrl + /
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Create new note
                  </span>
                  <span
                    className={`font-mono ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } px-2 py-0.5 rounded text-sm`}
                  >
                    Ctrl + N
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Search notes
                  </span>
                  <span
                    className={`font-mono ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } px-2 py-0.5 rounded text-sm`}
                  >
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
