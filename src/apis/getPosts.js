import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms";

function useGetPosts(category) {
  const [user] = useAtom(userAtom);

  async function handleLogin() {
    return await fetchData("GET", `/users/${user._id}/posts?category=${category}`);
  }

  const queryInfo = useQuery(["posts"], handleLogin, {
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return {
    posts: queryInfo.data?.data.posts,
    isLoading: queryInfo.isLoading,
    isError: queryInfo.isError,
    error: queryInfo.error,
  };
}

export default useGetPosts;
