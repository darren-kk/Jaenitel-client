import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms/userAtom";
import { modalStateAtom } from "../atoms/messageAtoms";

const baseURL = import.meta.env.VITE_BASE_URL;

function usePostMessage(messageInfo) {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const setModalState = useSetAtom(modalStateAtom);

  const queryClient = useQueryClient();

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
      const socket = io(baseURL);
      socket.emit("sendMessageNotification", { sendFrom: user.nickname, sendTo: messageInfo.sendTo });

      setModalState({ isOpen: false, messageId: null });
      queryClient.refetchQueries(["messages"]);
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
