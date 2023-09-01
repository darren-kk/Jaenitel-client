import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms/userAtom";

function usePostLogin() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  async function handleLogin(loginInfo) {
    return await fetchData("POST", "/auth/login", loginInfo);
  }

  const { mutateAsync: fetchLogin } = useMutation(handleLogin, {
    onSuccess: (result) => {
      const { data } = result;

      setUser(data.user);
      navigate("/boards");
    },
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return fetchLogin;
}

export default usePostLogin;
