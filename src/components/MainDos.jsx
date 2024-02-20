import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import Input from "./shared/Input";
import CreateChatRoomDos from "./CreateChatRoomDos";

import { commandList, boardsNumberList } from "../constants";

import { currentPageAtom, totalPageAtom } from "../atoms/pageAtoms";
import { scrollRefAtom, videoRefAtom } from "../atoms/refAtoms";
import { postsAtom, showMainDosAtom } from "../atoms/postAtoms";
import { userAtom } from "../atoms/userAtom";
import { messagesAtom, modalStateAtom } from "../atoms/messageAtoms";
import { chatRoomsAtom, showCreateChatRoomAtom } from "../atoms/chatRoomAtoms";

import usePostLogout from "../apis/postLogout";
import useDeletePost from "../apis/deletePost";

function MainDos() {
  const [command, setCommand] = useState("");
  const [showCommandList, setShowCommandList] = useState(false);
  const [labelMessage, setLabelMessage] = useState("");
  const [isVideoExist, setIsVideoExist] = useState(false);

  const setCurrentPage = useSetAtom(currentPageAtom);
  const setShowMainDos = useSetAtom(showMainDosAtom);

  const totalPage = useAtomValue(totalPageAtom);
  const scrollRef = useAtomValue(scrollRefAtom);
  const videoRef = useAtomValue(videoRefAtom);
  const posts = useAtomValue(postsAtom);
  const user = useAtomValue(userAtom);
  const messages = useAtomValue(messagesAtom);
  const chatRooms = useAtomValue(chatRoomsAtom);

  const [modalState, setModalState] = useAtom(modalStateAtom);
  const [showCreateChatRoomDos, setShowCreateChatRoomDos] = useAtom(showCreateChatRoomAtom);

  const commandInputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation("");
  const path = location.pathname.split("/");

  const fetchLogout = usePostLogout();
  const fetchDeletePost = useDeletePost(path[2]);

  useEffect(() => {
    if (videoRef?.current) {
      setIsVideoExist(true);
    }

    if (!videoRef?.current) {
      setIsVideoExist(false);
    }
  }, [videoRef]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        commandInputRef.current?.focus();
      }
    }

    function handleOnClick() {
      commandInputRef.current.focus();
    }

    if (commandInputRef.current) {
      commandInputRef.current.focus();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleOnClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleOnClick);
    };
  }, []);

  async function handleCommand() {
    let boardName;
    let index;
    let postId;

    if (path.length >= 2) {
      boardName = path[2];
    }
    if (path.length >= 4) {
      index = path[4];
    }
    if (path.length >= 5) {
      postId = path[5];
    }

    if (command === "h") {
      setShowCommandList(!showCommandList);
    }

    if (command === "x") {
      setLabelMessage("종료하고 로그인 화면으로 돌아가시겠습니까?");
    }

    if (command === "t") {
      setShowMainDos(true);
      navigate("/boards");
    }

    if (labelMessage) {
      if (command === "y") {
        if (labelMessage.includes("삭제")) {
          await fetchDeletePost(postId);
        }

        if (labelMessage.includes("종료")) {
          fetchLogout();
        }

        setCommand("");
        setLabelMessage("");

        return;
      }

      if (command === "n") {
        setCommand("");
        setLabelMessage("");

        return;
      }
    }

    if (command.endsWith("go")) {
      const number = command.split("g")[0].trim();

      if (path[path.length - 1] === "boards") {
        navigate(`${boardsNumberList[number]}`);
        setCommand("");

        return;
      }

      if (["greetings", "free", "humor"].includes(boardName)) {
        navigate(`/boards/${boardName}/post/${number}/${posts[number].postId}`);
        setCommand("");

        return;
      }

      if (path[2] === "messages") {
        setModalState({
          isOpen: true,
          messageId: messages[number].messageId,
        });
      }

      if (path[2] === "chatrooms") {
        navigate(`/boards/chatrooms/${number}/${chatRooms[number].roomId}`);
        setCommand("");

        return;
      }
    }

    if (command === "delete" && postId) {
      if (path[path.legnth - 1] === "edit") {
        setCommand("");

        return;
      }

      if (user._id !== posts[index].madeBy) {
        setLabelMessage("삭제 권한이 없습니다!");
        setCommand("");

        return;
      }

      setLabelMessage("해당 게시글을 삭제하시겠습니까?");
    }

    if (command === "new") {
      if (["humor", "greetings", "free"].includes(boardName)) {
        setShowMainDos(false);
        navigate(`/boards/${boardName}/post/new`);
      }

      if (path[2] === "messages") {
        setModalState({
          isOpen: true,
          messageId: "new",
        });
      }

      if (path[2] === "chatrooms") {
        setShowCreateChatRoomDos(true);
      }
    }

    if (command === "edit" && postId) {
      if (user._id !== posts[index].madeBy) {
        setLabelMessage("수정 권한이 없습니다!");
        setCommand("");

        return;
      }

      setShowMainDos(false);
      navigate(`/boards/${boardName}/post/${index}/${postId}/edit`);
    }

    if (command === "n") {
      setCurrentPage((old) => (old === totalPage ? old : old + 1));
    }

    if (command === "p") {
      setCurrentPage((old) => (old === 1 ? old : old - 1));
    }

    if (command === "b") {
      if (path.length === 2) {
        return;
      }

      navigate(-1);
    }

    if (command === "play") {
      videoRef.current.play();
    }

    if (command === "pause") {
      videoRef.current.pause();
    }

    if (command === "stop") {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setCommand("");
  }

  function handleKeyDown(event) {
    if (modalState.isOpen) {
      event.preventDefault();
    }

    if (event.key === "Enter") {
      handleCommand();
    }

    if (scrollRef) {
      if (event.key === "ArrowDown") {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollTop + 30,
          behavior: "smooth",
        });
      }

      if (event.key === "ArrowUp") {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollTop - 30,
          behavior: "smooth",
        });
      }
    }
  }

  return showCreateChatRoomDos ? (
    <CreateChatRoomDos />
  ) : (
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-15vh z-10">
      <div className="bg-white w-full h-1"></div>
      <div className="flex flex-col px-16 py-3">
        <span>## 명령어 안내 켜기/끄기(h)</span>
        <span>
          {path.length === 2
            ? "## 게시판 이동(번호 go) 초기화면(t) 종료(x)"
            : path.length === 3 && path[path.length - 1] === "messages"
            ? "## 쪽지 확인(번호 go) 스크롤(방향키 위 아래) 새 쪽지 쓰기(new) 뒤로가기(b) 초기화면(t) 종료(x)"
            : path.length === 3 && path[path.length - 1] === "chatrooms"
            ? "## 대화방 입장(번호 go) 다음 페이지(n) 이전 페이지(P) 새 대화방 생성(new) 뒤로가기(b) 초기화면(t) 종료(x)"
            : path.length === 3
            ? "## 게시글 이동(번호 go) 다음 페이지(n) 이전 페이지(P) 새 게시글 쓰기(new) 뒤로가기(b) 초기화면(t) 종료(x)"
            : path.length === 6
            ? "## 스크롤(방향키 위 아래) 게시글 수정(edit) 게시글 삭제(delete) 새 게시글 쓰기(new) 뒤로가기(b) 초기화면(t) 종료(x)"
            : ""}
        </span>
        {path.length === 6 && isVideoExist && (
          <span>## 동영상(재생: play, 일시정지: pause, 정지: stop 볼륨: 방향키 좌 우)</span>
        )}
        <div className="flex mt-2">
          <label>
            {labelMessage ? `${labelMessage} 확인(y) 취소(n)` : `선택 >>`}
            <Input
              ref={commandInputRef}
              className="ml-2 outline-none"
              type="text"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </label>
        </div>
        {showCommandList
          ? commandList.map((item) => (
              <span key={item.commandName}>
                {item.commandName}: {item.commandValue}
              </span>
            ))
          : ""}
      </div>
    </div>
  );
}

export default MainDos;
