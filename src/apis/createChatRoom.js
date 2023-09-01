import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms/userAtom";
import { showMainDosAtom } from "../atoms/postAtoms";

function usePostChatRoom(title) {
  const navigate = useNavigate();

  const user = useAtomValue(userAtom);
  const setShowMainDos = useSetAtom(showMainDosAtom);

  async function handlePostChatRoom() {
    return await fetchData("POST", `/users/${user._id}/chat-rooms`, { title });
  }

  const { mutateAsync: fetchPostChatRoom } = useMutation(handlePostChatRoom, {
    onSuccess: (result) => {
      const chatRoomId = result.data.chatRoom._id;
      const chatRoomIndex = result.data.totalChatRooms + 1;

      setShowMainDos(false);
      navigate(`/boards/chatrooms/${chatRoomIndex}/${chatRoomId}`);
    },
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return fetchPostChatRoom;
}

export default usePostChatRoom;
