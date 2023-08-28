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
    useErrorBoundary: true,
    retry: 1,
  });

  return {
    post: queryInfo.data?.data.post,
  };
}

export default useGetPost;
