import { Routes, Route, Navigate } from "react-router-dom";
import { useAtom } from "jotai";

import MainDos from "./components/MainDos";
import Login from "./pages/Login";
import Boards from "./pages/Boards";
import Board from "./pages/Board";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";

import { userAtom } from "./atoms";

function App() {
  const [user] = useAtom(userAtom);

  return (
    <div className="bg-blue-bg w-screen h-screen">
      {user && <MainDos />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardName" element={<Board />} />
        <Route path="/boards/:boardName/post/:postNumber" element={<Post />} />
        <Route path="/boards/:boardName/post/new" element={<NewPost />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
