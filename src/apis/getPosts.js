import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom, totalPageAtom, postsAtom } from "../atoms";

function useGetPosts(category, page, limit) {
  const user = useAtomValue(userAtom);
  const setTotalPage = useSetAtom(totalPageAtom);
  const setPosts = useSetAtom(postsAtom);

  async function fetchPosts() {
    return await fetchData("GET", `/users/${user._id}/posts?category=${category}&page=${page}&limit=${limit}`);
  }

  const queryInfo = useQuery(["posts", category, page, limit], fetchPosts, {
    keepPreviousData: true,
    onSuccess: (result) => {
      const postsWithIndex = {};
      result.data.posts.forEach((post) => {
        postsWithIndex[post.index] = post._id;
      });

      setPosts(postsWithIndex);
      setTotalPage(result.data.totalPages);
    },
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
