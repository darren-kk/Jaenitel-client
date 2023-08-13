import { useState } from "react";

import { commandList } from "../constants";
import Input from "./shared/Input";

function Dos() {
  const [command, setCommand] = useState("");
  const [showCommandList, setShowCommandList] = useState(false);

  function handleCommand() {
    if (command === "h") {
      setShowCommandList(true);
    }

    if (command !== "h" && showCommandList) {
      setShowCommandList(false);
    }

    setCommand("");
  }

  return (
    <div className="fixed bottom-0 left-0 w-full">
      <div className="bg-white w-full h-1 mb-2"></div>
      <div className="flex flex-col px-16 py-5">
        <span className="text-white">명령어 안내(h) 이동(번호/go) 초기화면(t) 종료(x)</span>
        <div className="flex">
          <label className="text-white">
            선택 {">>"}
            <Input
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
              <pre className="text-white" key={item.commandName}>
                {item.commandName}: {item.commandValue}
              </pre>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Dos;
