import { BrowserRouter, Routes, Route } from "react-router-dom";
import DraggableWindowScreen from "./components/DraggableWindowScreen";
import DraggableCircleScreen from "./components/DraggableCircleScreen";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/circle" element={<DraggableCircleScreen />} />
        <Route path="/" element={<DraggableWindowScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
