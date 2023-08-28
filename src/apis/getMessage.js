import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms";

function useGetMessage(messageId) {
  const user = useAtomValue(userAtom);

  async function fetchGetMessage() {
    return await fetchData("GET", `/users/${user._id}/messages/${messageId}`);
  }

  const queryInfo = useQuery(["message", messageId], fetchGetMessage, {
    useErrorBoundary: true,
  });

  return {
    message: queryInfo.data?.data.message,
  };
}

export default useGetMessage;
