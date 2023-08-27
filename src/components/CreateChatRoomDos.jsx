import { useState, useEffect, useRef } from "react";
import { useSetAtom } from "jotai";

import Input from "./shared/Input";

import usePostChatRoom from "../apis/createChatRoom";
import { showCreateChatRoomAtom } from "../atoms";

function CreateChatRoomDos() {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const titleInputRef = useRef(null);

  const setShowCreateChatRoomDos = useSetAtom(showCreateChatRoomAtom);

  const fetchCreateChatRoom = usePostChatRoom(title);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }

    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === "t") {
        titleInputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function handleInputKeyDown(event) {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === "Enter") {
      if (title === "$ c") {
        setShowCreateChatRoomDos(false);

        return;
      }

      try {
        await fetchCreateChatRoom();
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  }

  return (
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-15vh">
      <div className="bg-white w-full h-1"></div>
      <div className="flex flex-col px-16 py-3">
        <span>## 대화실 생성(Enter) 취소($ c) 돌아오기(컨트롤 + 쉬프트 + t(티))</span>
        <div>
          <label>
            {">>"}
            <Input
              ref={titleInputRef}
              className="ml-2 outline-none w-11/12"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={handleInputKeyDown}
            />
          </label>
        </div>
        <span>{errorMessage}</span>
      </div>
    </div>
  );
}

export default CreateChatRoomDos;
