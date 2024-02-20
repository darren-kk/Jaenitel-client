import { useAtomValue } from "jotai";

import LoginDos from "../components/LoginDos";
import SignupDos from "../components/SignupDos";

import { isSignupAtom } from "../atoms/loginAtoms";

function Login() {
  const isSignup = useAtomValue(isSignupAtom);

  return (
    <>
      <div className="flex-center w-full h-4/5 p-10 animate-slideFadeIn">
        <header className="flex-between border border-4 border-white w-3/5 h-96 mb-10 py-10">
          <h1 className="text-5xl font-press-start">WELCOME!!</h1>
          <span className="text-2xl font-press-start">※※※※※ PC JAENITEL ※※※※※</span>
        </header>
        <div className="flex-between border-y-4 border-white w-3/6 h-48 mb-2 p-5">
          <span className="text-xl tracking-wider">[ 환영합니다. [PC통신 재니텔 ] 입니다. ]</span>
          <span className="text-xl tracking-wider">▶︎ 게시판 및 대화실 이용시 건전한 언어를 사용합시다.</span>
        </div>
      </div>
      {isSignup ? <SignupDos /> : <LoginDos />}
    </>
  );
}

export default Login;
