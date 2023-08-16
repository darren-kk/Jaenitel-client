import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms";

function usePostLogout() {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  async function handleLogout() {
    return await fetchData("POST", "/auth/logout");
  }

  const { mutateAsync: fetchLogout } = useMutation(handleLogout, {
    onSuccess: () => {
      setUser("");
      navigate("/login");
    },
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return fetchLogout;
}

export default usePostLogout;
