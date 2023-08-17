import { Routes, Route, Navigate } from "react-router-dom";

import MainDos from "./components/MainDos";
import Login from "./pages/Login";
import Boards from "./pages/Boards";
import Board from "./pages/Board";

function App() {
  return (
    <div className="bg-blue-bg w-screen h-screen">
      <MainDos />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/greetings" element={<Board />} />
        <Route path="/boards/free" element={<Board />} />
        <Route path="/boards/humor" element={<Board />} />
        <Route path="/boards/special" element={<Board />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
