import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms";

function useGetMessage(messageId) {
  const user = useAtomValue(userAtom);

  async function fetchPost() {
    return await fetchData("GET", `/users/${user._id}/messages/${messageId}`);
  }

  const queryInfo = useQuery(["message", messageId], fetchPost, {
    keepPreviousData: true,
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return {
    message: queryInfo.data?.data.message,
    isLoading: queryInfo.isLoading,
    isError: queryInfo.isError,
    error: queryInfo.error,
  };
}

export default useGetMessage;
