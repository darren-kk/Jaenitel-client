import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom, showMainDosAtom, showCreateChatRoomAtom } from "../atoms";

function useDeleteChatRoom() {
  const navigate = useNavigate();

  const user = useAtomValue(userAtom);
  const setShowMainDos = useSetAtom(showMainDosAtom);
  const setShowCreateChatRoomDos = useSetAtom(showCreateChatRoomAtom);

  async function handleDeletePost(roomId) {
    await fetchData("DELETE", `/users/${user._id}/chat-rooms/${roomId}`);
  }

  const { mutateAsync: fetchDelete } = useMutation(handleDeletePost, {
    keepPreviousData: true,
    onSuccess: () => {
      setShowMainDos(true);
      setShowCreateChatRoomDos(false);
      navigate(`/boards/chatrooms`);
    },
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return fetchDelete;
}

export default useDeleteChatRoom;
