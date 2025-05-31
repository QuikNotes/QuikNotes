import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { NoteProvider } from "./context/NoteContext";
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
    <NoteProvider>
      <div className="app-container">
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
  );
}

export default App;
