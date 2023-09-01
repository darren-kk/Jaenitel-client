import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms/userAtom";
import { totalPageAtom } from "../atoms/pageAtoms";
import { chatRoomsAtom } from "../atoms/chatRoomAtoms";

function useGetChatRooms(page, limit) {
  const user = useAtomValue(userAtom);
  const setTotalPage = useSetAtom(totalPageAtom);
  const setChatRooms = useSetAtom(chatRoomsAtom);

  async function fetchGetChatRooms() {
    return await fetchData("GET", `/users/${user._id}/chat-rooms?page=${page}&limit=${limit}`);
  }

  const queryInfo = useQuery(["chatRooms", page, limit], fetchGetChatRooms, {
    useErrorBoundary: true,
    onSuccess: (result) => {
      const chatRoomsWithIndex = {};

      result.data.chatRooms.forEach((chatRoom) => {
        chatRoomsWithIndex[chatRoom.index] = { roomId: chatRoom._id, madeBy: chatRoom.madeBy };
      });

      setChatRooms(chatRoomsWithIndex);
      setTotalPage(result.data.totalPages);
    },
  });

  return {
    chatRooms: queryInfo.data?.data.chatRooms,
    totalChatRooms: queryInfo.data?.data.totalChatRooms,
  };
}

export default useGetChatRooms;
