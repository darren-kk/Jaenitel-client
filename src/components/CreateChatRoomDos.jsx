import { useState, useEffect, useRef } from "react";
import { useSetAtom } from "jotai";

import Input from "./shared/Input";

import usePostChatRoom from "../apis/createChatRoom";

import { showCreateChatRoomAtom } from "../atoms/chatRoomAtoms";

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

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setShowCreateChatRoomDos(false);
      }
    }

    function handleOnClick() {
      titleInputRef.current.focus();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleOnClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleOnClick);
    };
  }, []);

  async function handleInputKeyDown(event) {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === "Enter") {
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
        <span>## 대화방 생성(Enter) 취소(esc / escape)</span>
        <div>
          <label>
            {"대화방 이름 >>"}
            <Input
              ref={titleInputRef}
              className="ml-2 outline-none w-10/12"
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
