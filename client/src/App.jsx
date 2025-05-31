import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { NoteProvider } from "./context/NoteContext";
import { ThemeProvider } from "./context/ThemeContext";
import Toast from "./components/Toast";

function App() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Function to show toast notifications
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  // Function to hide toast
  const hideToast = () => {
    setToast({ show: false, message: "", type: "success" });
  };

  return (
    <ThemeProvider>
      <NoteProvider>
        <div className="app-container min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Home showToast={showToast} />
          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={hideToast}
            />
          )}
        </div>
      </NoteProvider>
    </ThemeProvider>
  );
}

export default App;
