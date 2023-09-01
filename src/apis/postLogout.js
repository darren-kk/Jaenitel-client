import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useAtom } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms/userAtom";

const baseURL = import.meta.env.VITE_BASE_URL;

function usePostLogout() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  async function handleLogout() {
    return await fetchData("POST", "/auth/logout");
  }

  const { mutateAsync: fetchLogout } = useMutation(handleLogout, {
    useErrorBoundary: true,
    onSuccess: () => {
      const socket = io(baseURL);
      socket.emit("leave-message", user.nickname);
      socket.off("messageNotification");
      socket.disconnect();

      setUser("");
      navigate("/login");
    },
  });

  return fetchLogout;
}

export default usePostLogout;
