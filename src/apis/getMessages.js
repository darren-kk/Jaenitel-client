import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom, messagesAtom } from "../atoms";

function useGetMessages() {
  const user = useAtomValue(userAtom);
  const setMessages = useSetAtom(messagesAtom);

  async function fetchGetMessages() {
    return await fetchData("GET", `/users/${user._id}/messages`);
  }

  const queryInfo = useQuery(["messages"], fetchGetMessages, {
    keepPreviousData: true,
    onSuccess: ({ data: { messages } }) => {
      const messagesWithIndex = {};

      ["sendedMessages", "receivedMessages"].forEach((category) => {
        messages[category].forEach((message) => {
          messagesWithIndex[message.index] = { messageId: message.id };
        });
      });

      setMessages(messagesWithIndex);
    },
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return {
    messages: queryInfo.data?.data.messages,
    isLoading: queryInfo.isLoading,
    isError: queryInfo.isError,
    error: queryInfo.error,
  };
}

export default useGetMessages;
