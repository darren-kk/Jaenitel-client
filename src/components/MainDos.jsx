import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import { commandList, boardsNumberList } from "../constants";
import {
  currentPageAtom,
  totalPageAtom,
  scrollRefAtom,
  videoRefAtom,
  postsAtom,
  userAtom,
  messagesAtom,
} from "../atoms";
import Input from "./shared/Input";

import usePostLogout from "../apis/postLogout";
import useDeletePost from "../apis/deletePost";

function MainDos() {
  const [command, setCommand] = useState("");
  const [showCommandList, setShowCommandList] = useState(false);
  const [labelMessage, setLabelMessage] = useState("");

  const setCurrentPage = useSetAtom(currentPageAtom);

  const totalPage = useAtomValue(totalPageAtom);
  const scrollRef = useAtomValue(scrollRefAtom);
  const videoRef = useAtomValue(videoRefAtom);
  const posts = useAtomValue(postsAtom);
  const user = useAtomValue(userAtom);
  const messages = useAtomValue(messagesAtom);

  const commandInputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation("");
  const path = location.pathname.split("/");

  const fetchLogout = usePostLogout();
  const fetchDeletePost = useDeletePost(path[2]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === "k") {
        commandInputRef.current.focus();
      }
    };

    if (commandInputRef.current) {
      commandInputRef.current.focus();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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
      setShowCommandList(true);
    }

    if (command !== "h" && showCommandList) {
      setShowCommandList(false);
    }

    if (command === "x") {
      try {
        fetchLogout();
      } catch (error) {
        console.error(error);
      }
    }

    if (command === "t") {
      navigate("/boards");
    }

    if (labelMessage) {
      if (command === "y") {
        if (labelMessage.endsWith("?")) {
          await fetchDeletePost(postId);
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

    if (command.endsWith(" go")) {
      const number = command.split(" ")[0];

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
        navigate(`/boards/messages/${number}/${messages[number].messageId}`);
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

    if (command === "new" && ["humor", "greetings", "free"].includes(boardName)) {
      navigate(`/boards/${boardName}/post/new`);
    }

    if (command === "edit" && postId) {
      if (user._id !== posts[index].madeBy) {
        setLabelMessage("수정 권한이 없습니다!");
        setCommand("");

        return;
      }

      navigate(`/boards/${boardName}/post/${index}/${postId}/edit`);
    }

    if (command === "next") {
      setCurrentPage((old) => (old === totalPage ? old : old + 1));
    }

    if (command === "prev") {
      setCurrentPage((old) => (old === 1 ? old : old - 1));
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
    if (event.key === "Enter") {
      handleCommand();
    }

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

  return (
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-15vh">
      <div className="bg-white w-full h-1"></div>
      <div className="flex flex-col px-16 py-3">
        <span>## 명령어 안내(h) 이동(번호/go) 초기화면(t) 종료(x) dos(컨트롤 + 쉬프트 + k(케이))</span>
        <div className="flex">
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
              <pre key={item.commandName}>
                {item.commandName}: {item.commandValue}
              </pre>
            ))
          : ""}
      </div>
    </div>
  );
}

export default MainDos;
