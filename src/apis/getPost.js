import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms";

function useGetPost(postId) {
  const user = useAtomValue(userAtom);

  async function fetchPost() {
    return await fetchData("GET", `/users/${user._id}/posts/${postId}`);
  }

  const queryInfo = useQuery(["post", postId], fetchPost, {
    keepPreviousData: true,
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return {
    post: queryInfo.data?.data.post,
    isLoading: queryInfo.isLoading,
    isError: queryInfo.isError,
    error: queryInfo.error,
  };
}

export default useGetPost;
