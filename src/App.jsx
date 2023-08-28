import { Routes, Route, Navigate } from "react-router-dom";
import { useAtomValue } from "jotai";

import MainDos from "./components/MainDos";
import Login from "./pages/Login";
import Boards from "./pages/Boards";
import Board from "./pages/Board";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import Messages from "./pages/Messages";
import ChatRooms from "./pages/ChatRooms";
import ChatRoom from "./pages/ChatRoom";
import AuthWrapper from "./components/AuthWrapper";

import { userAtom, showMainDosAtom } from "./atoms";

function App() {
  const user = useAtomValue(userAtom);
  const showMainDos = useAtomValue(showMainDosAtom);

  return (
    <div className="bg-blue-bg w-screen h-screen">
      {user && showMainDos && <MainDos />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/boards"
          element={
            <AuthWrapper>
              <Boards />
            </AuthWrapper>
          }
        />
        <Route
          path="/boards/messages"
          element={
            <AuthWrapper>
              <Messages />
            </AuthWrapper>
          }
        />
        <Route
          path="/boards/chatRooms"
          element={
            <AuthWrapper>
              <ChatRooms />
            </AuthWrapper>
          }
        />
        <Route
          path="/boards/chatRooms/:index/:roomId"
          element={
            <AuthWrapper>
              <ChatRoom />
            </AuthWrapper>
          }
        />
        <Route
          path="/boards/:boardName"
          element={
            <AuthWrapper>
              <Board />
            </AuthWrapper>
          }
        />
        <Route
          path="/boards/:boardName/post/:index/:postId"
          element={
            <AuthWrapper>
              <Post />
            </AuthWrapper>
          }
        />
        <Route
          path="/boards/:boardName/post/new"
          element={
            <AuthWrapper>
              <NewPost />
            </AuthWrapper>
          }
        />
        <Route
          path="/boards/:boardName/post/:index/:postId/edit"
          element={
            <AuthWrapper>
              <EditPost />
            </AuthWrapper>
          }
        />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
