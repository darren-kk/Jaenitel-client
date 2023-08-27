import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { showMainDosAtom } from "../atoms";

export function checkInputValidation(loginInfo) {
  const { email, password, reWrittenPassword, nickname } = loginInfo;

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const isValidEmailFormat = validRegex.test(email);
  const isValidPasswordLength = password.length >= 6 && password.length <= 20;
  const arePasswordsMatching = password === reWrittenPassword;
  const isValidNicknameLength = nickname.length >= 2 && nickname.length <= 8;
  const areFieldsNotEmpty =
    email.trim() !== "" && password.trim() !== "" && reWrittenPassword.trim() !== "" && nickname.trim() !== "";

  switch (true) {
    case !isValidEmailFormat:
      return "이메일 형식이 올바르지 않습니다.";
    case !isValidPasswordLength:
      return "비밀번호는 6자 이상 20자 이하이어야 합니다.";
    case !arePasswordsMatching:
      return "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
    case !isValidNicknameLength:
      return "닉네임은 2자 이상 8자 이하이어야 합니다.";
    case !areFieldsNotEmpty:
      return "모든 입력 필드를 채워주세요.";
    default:
      return true;
  }
}

export function useHandlePostCommand(setCommand, handleAddContent, titleRef, videoRef, refs, createPost, editPost) {
  const navigate = useNavigate();
  const setShowMainDos = useSetAtom(showMainDosAtom);

  function executeCommand(command) {
    switch (command) {
      case "text":
        handleAddContent("textContent");
        break;

      case "image":
        handleAddContent("imageContent");
        break;

      case "video":
        handleAddContent("videoContent");
        break;

      case "title":
        titleRef.current.focus();
        break;

      case "t":
        setShowMainDos(true);
        navigate("/boards");
        break;

      case "b":
        setShowMainDos(true);
        navigate(-1);
        break;

      case "play":
        videoRef.current.play();
        break;

      case "pause":
        videoRef.current.pause();
        break;

      case "stop":
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        break;

      case "submit":
        setShowMainDos(true);
        createPost();
        break;

      case "edit":
        setShowMainDos(true);
        editPost();
        break;

      default:
        if (command.endsWith(" go")) {
          const number = command.split(" ")[0];
          refs.current[number - 1].focus();
        }
    }

    setCommand("");
  }

  return { executeCommand };
}
