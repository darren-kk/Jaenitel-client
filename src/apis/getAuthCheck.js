import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import fetchData from "./axios";

import { userAtom } from "../atoms";

function useGetAuthCheck() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  async function fetchAuthUser() {
    return await fetchData("GET", "/auth/check");
  }

  useQuery(["authCheck"], fetchAuthUser, {
    retry: false,
    onSuccess: (response) => {
      const { success, user } = response.data;

      if (success) {
        setUser(user);
      } else {
        setUser("");
        navigate("/login");
      }
    },
    onError: () => {
      setUser("");
      navigate("/login");
    },
  });
}

export default useGetAuthCheck;
