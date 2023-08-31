import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms";

function usePostChat() {
  const user = useAtomValue(userAtom);

  async function handlePostChat(newChat) {
    return await fetchData("POST", `/users/${user._id}/chat-rooms/${newChat.roomId}`, { newChat });
  }

  const { mutateAsync: fetchPostChatRoom } = useMutation(handlePostChat, {
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return fetchPostChatRoom;
}

export default usePostChat;
