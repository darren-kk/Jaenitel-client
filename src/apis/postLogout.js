import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms";

function usePostLogout() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  async function handleLogout() {
    return await fetchData("POST", "/auth/logout");
  }

  const { mutateAsync: fetchLogout } = useMutation(handleLogout, {
    useErrorBoundary: true,
    onSuccess: () => {
      setUser("");
      navigate("/login");
    },
  });

  return fetchLogout;
}

export default usePostLogout;
