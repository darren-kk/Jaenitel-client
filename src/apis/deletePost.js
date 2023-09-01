import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms/userAtom";
import { showMainDosAtom } from "../atoms/postAtoms";

function useDeletePost(category) {
  const navigate = useNavigate();

  const user = useAtomValue(userAtom);
  const setShowMainDos = useSetAtom(showMainDosAtom);

  async function handleDeletePost(postId) {
    return await fetchData("DELETE", `/users/${user._id}/posts/${postId}`);
  }

  const { mutateAsync: fetchDelete } = useMutation(handleDeletePost, {
    useErrorBoundary: true,
    onSuccess: () => {
      setShowMainDos(true);
      navigate(`/boards/${category}`);
    },
  });

  return fetchDelete;
}

export default useDeletePost;
