import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms/userAtom";
import { messagesAtom } from "../atoms/messageAtoms";

function useGetMessages() {
  const user = useAtomValue(userAtom);
  const setMessages = useSetAtom(messagesAtom);

  async function fetchGetMessages() {
    return await fetchData("GET", `/users/${user._id}/messages`);
  }

  const queryInfo = useQuery(["messages"], fetchGetMessages, {
    useErrorBoundary: true,
    onSuccess: ({ data: { messages } }) => {
      const messagesWithIndex = {};

      ["sendedMessages", "receivedMessages"].forEach((category) => {
        messages[category].forEach((message) => {
          messagesWithIndex[message.index] = { messageId: message.id };
        });
      });

      setMessages(messagesWithIndex);
    },
  });

  return {
    messages: queryInfo.data?.data.messages,
  };
}

export default useGetMessages;
