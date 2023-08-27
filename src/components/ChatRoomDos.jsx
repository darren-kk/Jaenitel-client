import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import io from "socket.io-client";

import Input from "./shared/Input";
import { userAtom, showMainDosAtom } from "../atoms";

function ChatRoomDos() {
  const [chat, setChat] = useState("");
  const queryClient = useQueryClient();
  const chatInputRef = useRef(null);
  const socketRef = useRef();

  const { roomId } = useParams();
  const navigate = useNavigate();

  const user = useAtomValue(userAtom);
  const setShowMainDos = useSetAtom(showMainDosAtom);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, user._id, user.nickname]);

  function handleSendChat(event) {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === "Enter" && chat.trim()) {
      if (chat === "$ home") {
        setShowMainDos(true);
        navigate("/boards");

        socketRef.current.emit("leave-room", {
          roomId: roomId,
          writer: { _id: user._id, nickname: user.nickname },
          content: `${user.nickname}님이 퇴장하셨습니다.`,
          isSystem: true,
        });

        return;
      }

      const newChat = {
        roomId: roomId,
        writer: { _id: user._id, nickname: user.nickname },
        content: chat.trim(),
        isSystem: false,
      };

      queryClient.setQueryData(["chatRoom", roomId], (oldData) => {
        return {
          ...oldData,
          chats: [...oldData.chats, newChat],
        };
      });

      socketRef.current.emit("send-chat", newChat);
      setChat("");
    }
  }

  useEffect(() => {
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }

    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === "k") {
        chatInputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-15vh">
      <div className="bg-white w-full h-1"></div>
      <div className="flex flex-col px-4 py-3">
        <span>## 채팅(Enter) 채팅창(컨트롤 + 쉬프트 + k(케이)) 나가기($ home)</span>
        <div>
          <label>
            {">>"}
            <Input
              ref={chatInputRef}
              className="ml-2 mb-2 outline-none w-11/12"
              type="text"
              value={chat}
              onChange={(event) => setChat(event.target.value)}
              onKeyDown={handleSendChat}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default ChatRoomDos;
