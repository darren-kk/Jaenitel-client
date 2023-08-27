import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import io from "socket.io-client";

import Input from "./shared/Input";
import { userAtom, showMainDosAtom, showCreateChatRoomAtom, scrollRefAtom } from "../atoms";

import useDeleteChatRoom from "../apis/deleteChatRoom";

function ChatRoomDos() {
  const [chat, setChat] = useState("");
  const chatInputRef = useRef(null);
  const socketRef = useRef();

  const queryClient = useQueryClient();

  const { roomId } = useParams();
  const navigate = useNavigate();

  const deleteChatRoom = useDeleteChatRoom();

  const user = useAtomValue(userAtom);
  const scrollRef = useAtomValue(scrollRefAtom);
  const setShowMainDos = useSetAtom(showMainDosAtom);
  const setShowCreateChatRoomDos = useSetAtom(showCreateChatRoomAtom);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, user._id, user.nickname]);

  async function handleSendChat(event) {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === "Enter" && chat.trim()) {
      if (chat === "$ home") {
        setShowMainDos(true);
        setShowCreateChatRoomDos(false);
        navigate("/boards");

        return;
      }

      if (chat === "$ delete") {
        await deleteChatRoom(roomId);

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
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-15vh z-10">
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
