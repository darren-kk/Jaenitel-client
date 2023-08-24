import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom, modalStateAtom } from "../atoms";

function usePostMessage(messageInfo) {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const setModalState = useSetAtom(modalStateAtom);

  async function handleFetchPost() {
    const formData = new FormData();
    formData.append("sendFrom", user._id);
    formData.append("sendTo", messageInfo.sendTo);

    messageInfo.contents.forEach((content, index) => {
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

    await fetchData("POST", `/users/${user._id}/messages`, formData, {
      "Content-Type": "multipart/form-data",
    });
  }

  const { mutateAsync: fetchPost } = useMutation(handleFetchPost, {
    onSuccess: () => {
      setModalState({ isOpen: false, messageId: null });
      navigate(`/boards/messages`);
    },
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return fetchPost;
}

export default usePostMessage;
