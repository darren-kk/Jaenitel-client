import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom, totalPageAtom, chatRoomsAtom } from "../atoms";

function useGetChatRooms(page, limit) {
  const user = useAtomValue(userAtom);
  const setTotalPage = useSetAtom(totalPageAtom);
  const setChatRooms = useSetAtom(chatRoomsAtom);

  async function fetchGetChatRooms() {
    return await fetchData("GET", `/users/${user._id}/chat-rooms?page=${page}&limit=${limit}`);
  }

  const queryInfo = useQuery(["chatRooms", page, limit], fetchGetChatRooms, {
    keepPreviousData: true,
    onSuccess: (result) => {
      const chatRoomsWithIndex = {};

      result.data.chatRooms.forEach((chatRoom) => {
        chatRoomsWithIndex[chatRoom.index] = { roomId: chatRoom._id, madeBy: chatRoom.madeBy._id };
      });

      setChatRooms(chatRoomsWithIndex);
      setTotalPage(result.data.totalPages);
    },
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return {
    chatRooms: queryInfo.data?.data.chatRooms,
    totalChatRooms: queryInfo.data?.data.totalChatRooms,
    isLoading: queryInfo.isLoading,
    isError: queryInfo.isError,
    error: queryInfo.error,
  };
}

export default useGetChatRooms;
