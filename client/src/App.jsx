import "./App.css";
import Home from "./pages/Home";
import { NoteProvider } from "./context/NoteContext";

function App() {
  return (
    <NoteProvider>
      <Home />
    </NoteProvider>
  );
}

export default App;
