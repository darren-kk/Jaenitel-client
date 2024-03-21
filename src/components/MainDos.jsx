import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import Input from "./shared/Input";
import CreateChatRoomDos from "./CreateChatRoomDos";

import { commandList, boardsNumberList } from "../constants";
import * as Commands from "../utils/commands";

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

  const handleCommand = async () => {
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

    switch (true) {
      case command === "h":
        Commands.toggleCommandList(showCommandList, setShowCommandList).execute();
        break;

      case command === "t":
        Commands.navigateToHome(navigate, setShowMainDos).execute();
        break;

      case command === "x":
        Commands.setLogoutMessage(setLabelMessage).execute();
        break;

      case command === "y" && labelMessage.includes("삭제"):
        await Commands.confirmDeletePost(fetchDeletePost, postId, setCommand, setLabelMessage).execute();
        break;

      case command === "y" && labelMessage.includes("종료"):
        Commands.confirmLogout(fetchLogout, setCommand, setLabelMessage).execute();
        break;

      case command === "n":
        if (labelMessage) {
          Commands.cancelCommand(setCommand, setLabelMessage).execute();
          break;
        } else {
          Commands.nextPage(setCurrentPage, totalPage).execute();
          break;
        }

      case command === "p":
        Commands.previousPage(setCurrentPage).execute();
        break;

      case command === "b":
        Commands.goBack(navigate, path.length).execute();
        break;

      case command === "new":
        Commands.createNew(
          navigate,
          setShowMainDos,
          setShowCreateChatRoomDos,
          setModalState,
          boardName,
          path,
        ).execute();
        break;

      case command === "edit" && Boolean(postId):
        Commands.editPost(setShowMainDos, navigate, user, posts, index, boardName, postId).execute();
        break;

      case command === "delete" && Boolean(postId):
        Commands.setDeletePostMessage(setLabelMessage, user, posts, index).execute();
        break;

      case ["play", "pause", "stop"].includes(command):
        Commands.controlVideo(videoRef, command).execute();
        break;

      case command.endsWith("go"):
        Commands.navigateByCommand(
          navigate,
          setCommand,
          setModalState,
          boardsNumberList,
          posts,
          messages,
          chatRooms,
          path,
          boardName,
        ).execute(command);
        break;

      default:
        Commands.cancelCommand(setCommand, setLabelMessage).execute();
        break;
    }

    setCommand("");
  };

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
