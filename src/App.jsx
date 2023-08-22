import { Routes, Route, Navigate } from "react-router-dom";
import { useAtomValue } from "jotai";

import MainDos from "./components/MainDos";
import Login from "./pages/Login";
import Boards from "./pages/Boards";
import Board from "./pages/Board";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";

import { userAtom, isNewPostAtom } from "./atoms";

function App() {
  const user = useAtomValue(userAtom);
  const isNewPost = useAtomValue(isNewPostAtom);

  return (
    <div className="bg-blue-bg w-screen h-screen">
      {user && !isNewPost && <MainDos />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardName" element={<Board />} />
        <Route path="/boards/:boardName/post/:postId" element={<Post />} />
        <Route path="/boards/:boardName/post/new" element={<NewPost />} />
        <Route path="/boards/:boardName/post/:postId/edit" element={<EditPost />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
