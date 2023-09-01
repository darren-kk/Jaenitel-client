import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms/userAtom";

function useGetChatRoom(roomId) {
  const user = useAtomValue(userAtom);

  async function fetchGetChatRoom() {
    return await fetchData("GET", `/users/${user._id}/chat-rooms/${roomId}`);
  }

  const queryInfo = useQuery(["chatRoom", roomId], fetchGetChatRoom, {
    useErrorBoundary: true,
  });

  return {
    chatRoom: queryInfo.data?.data.chatRoom,
  };
}

export default useGetChatRoom;
