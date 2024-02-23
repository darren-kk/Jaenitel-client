import { useAtomValue } from "jotai";

import { userAtom } from "../atoms/userAtom";

import useGetAuthCheck from "../apis/getAuthCheck";
import { ReactNode } from "react";

interface AuthWrapperProp {
  children: ReactNode;
}

function AuthWrapper({ children }: AuthWrapperProp) {
  const user = useAtomValue(userAtom);
  useGetAuthCheck();

  if (!user) {
    return null;
  }

  return children;
}

export default AuthWrapper;
