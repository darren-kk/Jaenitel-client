import { useEffect, useRef } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import io from "socket.io-client";

import ChatRoomDos from "../components/ChatRoomDos";

import fetchData from "../apis/axios";
import { userAtom, scrollRefAtom } from "../atoms";

const baseURL = import.meta.env.VITE_BASE_URL;

function ChatRoom() {
  const scrollRef = useRef(null);
  const queryClient = useQueryClient();
  const { roomId } = useParams();

  const setScrollRef = useSetAtom(scrollRefAtom);

  const user = useAtomValue(userAtom);

  async function fetchGetChatRoom() {
    const data = await fetchData("GET", `/users/${user._id}/chat-rooms/${roomId}`);

    return data.data.chatRoom;
  }

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const { data: chatRoom } = useQuery(["chatRoom", roomId], fetchGetChatRoom, {
    keepPreviousData: true,
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  useEffect(() => {
    if (scrollRef) {
      setScrollRef(scrollRef);

      scrollToBottom();
    }
  }, [setScrollRef, chatRoom?.chats]);

  useEffect(() => {
    const socket = io(baseURL);

    socket.emit("join-room", {
      roomId: roomId,
      writer: { _id: user._id, nickname: user.nickname },
      content: `${user.nickname}님이 입장하셨습니다.`,
      isSystem: true,
    });

    socket.on("user-joined", (message) => {
      queryClient.setQueryData(["chatRoom", roomId], (oldData) => {
        return {
          ...oldData,
          users: [...oldData.users, message.writer],
          chats: [...oldData.chats, message],
        };
      });
    });

    socket.on("user-left", (message) => {
      queryClient.setQueryData(["chatRoom", roomId], (oldData) => {
        return {
          ...oldData,
          users: oldData.users.filter((user) => user._id !== message.writer._id),
          chats: [...oldData.chats, message],
        };
      });
    });

    socket.on("new-chat", (newChat) => {
      if (newChat.writer._id === user._id) {
        return;
      }

      queryClient.setQueryData(["chatRoom", roomId], (oldData) => {
        return {
          ...oldData,
          chats: [...oldData.chats, newChat],
        };
      });

      scrollToBottom();
    });

    return () => {
      socket.emit("leave-room", {
        roomId: roomId,
        writer: { _id: user._id, nickname: user.nickname },
        content: `${user.nickname}님이 퇴장하셨습니다.`,
        isSystem: true,
      });
      socket.off("new-chat");
      socket.disconnect();
    };
  }, [roomId, queryClient, user._id, user.nickname, user]);

  return (
    <>
      <div className="flex-center pt-5 animate-slideFadeIn">
        <header className="flex-center w-full h-20vh pt-5">
          <div className="flex-center border-menu shadow-lg text-4xl w-4/5 mb-6">실시간 대화방</div>
          <div className="flex w-full pl-4">
            <span className="text-lg w-3/12">방 이름: {chatRoom?.title}</span>
            <span className="text-lg w-2/12">참여인원: {chatRoom?.users.length}</span>
            <div className="text-lg">
              참여유저:
              {chatRoom?.users.map((user) => (
                <span key={user._id} className="text-lg w-2/12 mx-2">
                  {user.nickname}
                </span>
              ))}
            </div>
          </div>
        </header>
        <div className="bg-white w-full h-1 mb-2"></div>
        <main ref={scrollRef} className="w-full h-65vh px-4 py-4 overflow-auto">
          <div className="flex flex-col justify-end items-start w-full">
            {chatRoom?.chats?.map((chat) => {
              return (
                <pre className="font-dung-guen-mo mb-2" key={chat._id}>
                  {">>"} {chat.isSystem ? "SYSTEM" : chat.writer?.nickname}: {chat.content}
                </pre>
              );
            })}
          </div>
        </main>
      </div>
      <ChatRoomDos />
    </>
  );
}

export default ChatRoom;
