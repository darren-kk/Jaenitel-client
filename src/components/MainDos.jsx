import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { commandList, boardsNumberList } from "../constants";
import Input from "./shared/Input";

import usePostLogout from "../apis/postLogout";

function MainDos() {
  const [command, setCommand] = useState("");
  const [showCommandList, setShowCommandList] = useState(false);
  const commandInputRef = useRef(null);
  const fetchLogout = usePostLogout();
  const navigate = useNavigate();

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
      navigate(`${boardsNumberList[number]}`);
    }

    setCommand("");
  }

  return (
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-2/5">
      <div className="bg-white w-full h-1 mb-2"></div>
      <div className="flex flex-col px-16 py-5">
        <span>명령어 안내(h) 이동(번호/go) 초기화면(t) 종료(x)</span>
        <div className="flex">
          <label>
            선택 {">>"}
            <Input
              ref={commandInputRef}
              className="ml-2 outline-none"
              type="text"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleCommand();
                }
              }}
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
