import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { ErrorBoundary } from "react-error-boundary";

import MainDos from "./components/MainDos";
import Introduction from "./pages/Introduction";
import Login from "./pages/Login";
import Boards from "./pages/Boards";
import Board from "./pages/Board";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import Messages from "./pages/Messages";
import ChatRooms from "./pages/ChatRooms";
import ChatRoom from "./pages/ChatRoom";
import Special from "./pages/Special";
import AuthWrapper from "./components/AuthWrapper";
import ErrorPage from "./pages/ErrorPage";
import SocketMessageWrapper from "./components/SocketMessageWrapper";

import { userAtom, showMainDosAtom } from "./atoms";

function App() {
  const user = useAtomValue(userAtom);
  const showMainDos = useAtomValue(showMainDosAtom);
  const navigate = useNavigate();

  return (
    <div className="bg-blue-bg w-screen h-screen">
      <ErrorBoundary
        FallbackComponent={ErrorPage}
        onReset={() => {
          navigate("/boards");
        }}
      >
        {user && showMainDos && <MainDos />}
        <SocketMessageWrapper>
          <Routes>
            <Route path="/introduction" element={<Introduction />} />
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
            <Route
              path="/boards/special"
              element={
                <AuthWrapper>
                  <Special />
                </AuthWrapper>
              }
            />
            <Route path="/" element={<Navigate replace to="/introduction" />} />
          </Routes>
        </SocketMessageWrapper>
      </ErrorBoundary>
    </div>
  );
}

export default App;
