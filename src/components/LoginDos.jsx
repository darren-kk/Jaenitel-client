import { useState, useRef, useEffect } from "react";

import usePostLogin from "../apis/postLogin";
import Input from "./shared/Input";

function LoginDos() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const idInputRef = useRef(null);
  const passwordInputRef = useRef(null);

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

    if (event.key === "Enter" || event.key === "Tab") {
      setShowPasswordInput(true);
    }
  }

  function handlePassswordKeyDown(event) {
    if (event.key === "Enter") {
      fetchLogin(loginInfo);
    }
  }

  return (
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-2/5">
      <div className="bg-white w-full h-1 mb-2"></div>
      <div className="flex flex-col px-16 py-5">
        <span>## 이용자 ID가 없거나 신규/무료가입을 하시려면 guest를 입력 하십시오.</span>
        <form className="flex flex-col">
          <label>
            이용자 ID :
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
      </div>
    </div>
  );
}

export default LoginDos;
