import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms";

function useDeletePost(category) {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  async function handleDeletePost(postId) {
    return await fetchData("DELETE", `/users/${user._id}/posts/${postId}`);
  }

  const { mutateAsync: fetchDelete } = useMutation(handleDeletePost, {
    keepPreviousData: true,
    onSuccess: () => {
      navigate(`/boards/${category}`);
    },
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return fetchDelete;
}

export default useDeletePost;
