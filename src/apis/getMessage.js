import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms/userAtom";

function useGetMessage(messageId) {
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();

  async function fetchGetMessage() {
    return await fetchData("GET", `/users/${user._id}/messages/${messageId}`);
  }

  const queryInfo = useQuery(["message", messageId], fetchGetMessage, {
    onSuccess: () => {
      queryClient.refetchQueries(["messages"]);
    },
    useErrorBoundary: true,
  });

  return {
    message: queryInfo.data?.data.message,
  };
}

export default useGetMessage;
