import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NoteList from "../components/NoteList";

export default function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowSidebar(true);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen bg-purple-50 flex overflow-hidden fixed inset-0">
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
        <div className="bg-purple-50 h-16 flex justify-center items-center px-4 z-10 border-b border-gray-100"></div>

        {/* Notes Content - Scrollable */}
        <div className="flex-1 bg-purple-50 p-4 md:p-6 overflow-hidden">
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
                <NoteList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
