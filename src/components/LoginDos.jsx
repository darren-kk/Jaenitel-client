import { useState, useRef, useEffect } from "react";
import { useAtom } from "jotai";

import usePostLogin from "../apis/postLogin";
import Input from "./shared/Input";

import { isSignupAtom } from "../atoms";

function LoginDos() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const idInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [, setIsSignup] = useAtom(isSignupAtom);

  const fetchLogin = usePostLogin();

  useEffect(() => {
    if (idInputRef.current) {
      idInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (showPasswordInput && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [showPasswordInput]);

  function handleIdKeyDown(event) {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (showPasswordInput) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        passwordInputRef.current.focus();
      }
    }

    if (event.key === "Enter" || event.key === "Tab") {
      if (loginInfo.email === "guest") {
        setIsSignup(true);
      }

      setShowPasswordInput(true);
    }
  }

  async function handlePassswordKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      idInputRef.current.focus();
    }

    if (event.key === "Enter") {
      try {
        await fetchLogin(loginInfo);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  }

  return (
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-2/5">
      <div className="bg-white w-full h-1 mb-2"></div>
      <div className="flex flex-col px-16 py-5">
        <span>## 이용자 ID가 없거나 신규/무료가입을 하시려면 guest를 입력 하십시오.</span>
        <span>## 입력 : Enter</span>
        <form className="flex flex-col">
          <label>
            이용자 E-mail :
            <Input
              ref={idInputRef}
              className="ml-2 outline-none w-4/5"
              type="text"
              value={loginInfo.email}
              onChange={(event) => setLoginInfo({ ...loginInfo, email: event.target.value })}
              onKeyDown={handleIdKeyDown}
            />
          </label>
          {showPasswordInput && (
            <label>
              비밀번호 :
              <Input
                ref={passwordInputRef}
                className="ml-2 outline-none w-4/5"
                type="text"
                value={loginInfo.password}
                onChange={(event) => setLoginInfo({ ...loginInfo, password: event.target.value })}
                onKeyDown={handlePassswordKeyDown}
              />
            </label>
          )}
        </form>
        <span>{errorMessage}</span>
      </div>
    </div>
  );
}

export default LoginDos;
