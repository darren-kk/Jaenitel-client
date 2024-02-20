import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import io from "socket.io-client";

import Input from "./shared/Input";

import { userAtom } from "../atoms/userAtom";
import { showMainDosAtom } from "../atoms/postAtoms";
import { showCreateChatRoomAtom } from "../atoms/chatRoomAtoms";
import { scrollRefAtom } from "../atoms/refAtoms";

import useDeleteChatRoom from "../apis/deleteChatRoom";
import usePostChat from "../apis/postChat";

const baseURL = import.meta.env.VITE_BASE_URL;

function ChatRoomDos() {
  const [chat, setChat] = useState("");
  const chatInputRef = useRef(null);
  const socketRef = useRef();

  const queryClient = useQueryClient();

  const { roomId } = useParams();
  const navigate = useNavigate();

  const deleteChatRoom = useDeleteChatRoom();
  const postChat = usePostChat();

  const user = useAtomValue(userAtom);
  const scrollRef = useAtomValue(scrollRefAtom);
  const setShowMainDos = useSetAtom(showMainDosAtom);
  const setShowCreateChatRoomDos = useSetAtom(showCreateChatRoomAtom);

  useEffect(() => {
    socketRef.current = io(baseURL);

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, user._id, user.nickname]);

  async function handleSendChat(event) {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === "Enter" && chat.trim()) {
      if (chat === "/home" || chat === "/h") {
        setShowMainDos(true);
        setShowCreateChatRoomDos(false);
        navigate("/boards");

        return;
      }

      if (chat === "/back" || chat === "/b") {
        setShowMainDos(true);
        setShowCreateChatRoomDos(false);
        navigate(-1);

        return;
      }

      if (chat === "/delete" || chat === "/d") {
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
      await postChat(newChat);
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

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        chatInputRef.current.focus();
      }
    }

    function handleOnClick() {
      chatInputRef.current.focus();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleOnClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleOnClick);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-15vh z-10">
      <div className="bg-white w-full h-1"></div>
      <div className="flex flex-col px-16 py-3">
        <span>## 채팅(Enter) 나가기(/back) 대화방 삭제(/delete) 대화창(esc / escape)</span>
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
