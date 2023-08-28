import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom, showMainDosAtom, postInfoAtom } from "../atoms";

function usePutPost(postInfo) {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const setShowMainDos = useSetAtom(showMainDosAtom);
  const setPostInfo = useSetAtom(postInfoAtom);

  async function handleFetchPost() {
    const formData = new FormData();
    formData.append("title", postInfo.title);
    formData.append("category", postInfo.category);
    formData.append("madeBy", postInfo.madeBy);

    postInfo.contents.forEach((content, index) => {
      if (content.textContent) {
        formData.append(`contents[${index}][textContent]`, content.textContent);
      }
      if (content.imageContent) {
        formData.append(`contents[${index}][imageContent]`, content.imageContent);
      }
      if (content.videoContent) {
        formData.append(`contents[${index}][videoContent]`, content.videoContent);
      }
    });

    await fetchData("PUT", `/users/${user._id}/posts/${postInfo._id}`, formData, {
      "Content-Type": "multipart/form-data",
    });
  }

  const { mutateAsync: fetchPutPost } = useMutation(handleFetchPost, {
    useErrorBoundary: true,
    onSuccess: () => {
      setShowMainDos(true);
      setPostInfo({
        title: "",
        category: "",
        madeBy: "",
        contents: [{ textContent: "" }],
      });
      navigate(`/boards/${postInfo.category}`);
    },
  });

  return fetchPutPost;
}

export default usePutPost;
