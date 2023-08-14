import { useState } from "react";

import { commandList } from "../constants";
import Input from "./shared/Input";

function LoginDos() {
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
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-2/5">
      <div className="bg-white w-full h-1 mb-2"></div>
      <div className="flex flex-col px-16 py-5">
        <span>## 이용자 ID가 없거나 신규/무료가입을 하시려면 guest를 입력 하십시오.</span>
        <div className="flex">
          <label>
            이용자 ID :
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
              <pre key={item.commandName}>
                {item.commandName}: {item.commandValue}
              </pre>
            ))
          : ""}
      </div>
    </div>
  );
}

export default LoginDos;
