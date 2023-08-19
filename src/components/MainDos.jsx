import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { commandList, boardsNumberList } from "../constants";
import { currentPageAtom, totalPageAtom, scrollRefAtom, videoRefAtom } from "../atoms";
import Input from "./shared/Input";

import usePostLogout from "../apis/postLogout";

function MainDos() {
  const [command, setCommand] = useState("");
  const [showCommandList, setShowCommandList] = useState(false);

  const setCurrentPage = useSetAtom(currentPageAtom);
  const totalPage = useAtomValue(totalPageAtom);
  const scrollRef = useAtomValue(scrollRefAtom);
  const videoRef = useAtomValue(videoRefAtom);

  const commandInputRef = useRef(null);

  const fetchLogout = usePostLogout();
  const navigate = useNavigate();

  const location = useLocation("");
  const path = location.pathname.split("/");
  const boardName = path[path.length - 1];

  useEffect(() => {
    if (commandInputRef.current) {
      commandInputRef.current.focus();
    }
  }, []);

  function handleCommand() {
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

    if (command.endsWith(" go")) {
      const number = command.split(" ")[0];

      if (boardName === "boards") {
        navigate(`${boardsNumberList[number]}`);
        setCommand("");

        return;
      }

      navigate(`/boards/${boardName}/post/${number}`);
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
        <span>## 명령어 안내(h) 이동(번호/go) 초기화면(t) 종료(x)</span>
        <div className="flex">
          <label>
            선택 {">>"}
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
