import { useState, useRef, useEffect } from "react";
import { useSetAtom } from "jotai";

import Input from "./shared/Input";

import { checkInputValidation } from "../utils/utils";
import usePostSignup from "../apis/postSignup";

import { isSignupAtom } from "../atoms/loginAtoms";

let focusedIndex = 0;

function SignupDos() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    nickname: "",
    reWrittenPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const idInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const reWrittenPasswordInputRef = useRef(null);
  const nicknmaeInputRef = useRef(null);

  const setIsSignup = useSetAtom(isSignupAtom);

  const fetchSignup = usePostSignup();

  const inputRefs = [idInputRef, passwordInputRef, reWrittenPasswordInputRef, nicknmaeInputRef];

  useEffect(() => {
    if (idInputRef.current) {
      idInputRef.current.focus();
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsSignup(false);
      }
    }

    function handleOnClick() {
      idInputRef.current.focus();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleOnClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleOnClick);
    };
  }, [setIsSignup]);

  function moveFocus(event) {
    if (event.key === "Enter" || event.key === "Tab" || event.key === "ArrowDown") {
      event.preventDefault();
      focusedIndex++;
    }

    if (event.key === "ArrowUp") {
      focusedIndex--;
    }

    if (focusedIndex >= inputRefs.length) {
      focusedIndex = 0;
    }

    if (focusedIndex < 0) {
      focusedIndex = inputRefs.length - 1;
    }

    inputRefs[focusedIndex].current.focus();
  }

  async function handleInputKeyDown(event) {
    if (event.nativeEvent.isComposing) {
      return;
    }

    const isNicknameFocused = document.activeElement === nicknmaeInputRef.current;

    if (isNicknameFocused && event.key === "Enter") {
      if (checkInputValidation(loginInfo) !== true) {
        setErrorMessage(checkInputValidation(loginInfo));

        return;
      }

      try {
        await fetchSignup(loginInfo);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    moveFocus(event);
  }

  return (
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-2/5">
      <div className="bg-white w-full h-1 mb-2"></div>
      <div className="flex flex-col px-16 py-5">
        <span className="mb-1">※※※※ 회원가입 ※※※※</span>
        <span>## 비밀번호는 6자 이상 20자 이하 여야 합니다.</span>
        <span>## 닉네임은 2자 이상 8자 이하 여야 합니다.</span>
        <span>## 로그인으로 돌아가기: (esc / Escape)</span>
        <span>## 이동 : Enter / Tab / 방향키</span>
        <span>## 제출 : Enter</span>
        <form className="flex flex-col m-2">
          <label>
            이용자 E-mail :
            <Input
              ref={idInputRef}
              className="ml-2 outline-none w-4/5"
              type="text"
              value={loginInfo.email}
              onChange={(event) => setLoginInfo({ ...loginInfo, email: event.target.value })}
              onKeyDown={handleInputKeyDown}
            />
          </label>
          <label>
            비밀번호 :
            <Input
              ref={passwordInputRef}
              className="ml-2 outline-none w-4/5"
              type="password"
              value={loginInfo.password}
              onChange={(event) => setLoginInfo({ ...loginInfo, password: event.target.value })}
              onKeyDown={handleInputKeyDown}
            />
          </label>
          <label>
            비밀번호 확인 :
            <Input
              ref={reWrittenPasswordInputRef}
              className="ml-2 outline-none w-4/5"
              type="password"
              value={loginInfo.reWrittenPassword}
              onChange={(event) => setLoginInfo({ ...loginInfo, reWrittenPassword: event.target.value })}
              onKeyDown={handleInputKeyDown}
            />
          </label>
          <label>
            닉네임 :
            <Input
              ref={nicknmaeInputRef}
              className="ml-2 outline-none w-4/5"
              type="text"
              value={loginInfo.nickname}
              onChange={(event) => setLoginInfo({ ...loginInfo, nickname: event.target.value })}
              onKeyDown={handleInputKeyDown}
            />
          </label>
        </form>
        <span>{errorMessage}</span>
      </div>
    </div>
  );
}

export default SignupDos;
