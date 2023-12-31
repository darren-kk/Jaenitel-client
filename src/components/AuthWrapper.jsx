import { useAtomValue } from "jotai";
import PropTypes from "prop-types";

import { userAtom } from "../atoms/userAtom";

import useGetAuthCheck from "../apis/getAuthCheck";

function AuthWrapper({ children }) {
  const user = useAtomValue(userAtom);
  useGetAuthCheck();

  if (!user) {
    return null;
  }

  return children;
}

AuthWrapper.propTypes = {
  children: PropTypes.any,
};

export default AuthWrapper;
