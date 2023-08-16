import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

import fetchData from "./axios";

import { isSignupAtom } from "../atoms";

function usePostSignup() {
  const navigate = useNavigate();
  const [, setIsSignup] = useAtom(isSignupAtom);

  async function handleSignup(loginInfo) {
    return await fetchData("POST", "/auth/signup", loginInfo);
  }

  const { mutateAsync: fetchSignup } = useMutation(handleSignup, {
    onSuccess: () => {
      setIsSignup(false);
      navigate("/login");
    },
    onError: (result) => {
      const error = new Error(result.response.data.message);
      error.status = result.response.status;

      throw error;
    },
  });

  return fetchSignup;
}

export default usePostSignup;
