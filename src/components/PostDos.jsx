import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import PropTypes from "prop-types";

import Input from "./shared/Input";

import { videoRefAtom, scrollRefAtom, titleRefAtom } from "../atoms/refAtoms";
import { postInfoAtom, showMainDosAtom } from "../atoms/postAtoms";

import useCreatePost from "../apis/createPost";
import usePutPost from "../apis/putPost";

function PostDos({ handleAddContent, contentRefs }) {
  const [command, setCommand] = useState("");
  const commandInputRef = useRef(null);

  const navigate = useNavigate();
  const setShowMainDos = useSetAtom(showMainDosAtom);

  const param = useLocation();
  const postMode = param.pathname.split("/").at(-1);

  const scrollRef = useAtomValue(scrollRefAtom);
  const videoRef = useAtomValue(videoRefAtom);
  const titleRef = useAtomValue(titleRefAtom);
  const postInfo = useAtomValue(postInfoAtom);

  const createPost = useCreatePost(postInfo);
  const editPost = usePutPost(postInfo);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        commandInputRef.current.focus();
      }
    }

    function handleOnClick() {
      commandInputRef.current.focus();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleOnClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleOnClick);
    };
  }, []);

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
        if (postMode === "edit") {
          editPost();
        }

        if (postMode === "new") {
          createPost();
        }
        break;

      default:
        if (command.endsWith("go")) {
          const number = command.split("g")[0].trim();

          contentRefs.current[number - 1].focus();
        }
    }

    setCommand("");
  }

  function handleKeyDown(event) {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      executeCommand(command);
    }

    if (event.key === "ArrowDown") {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollTop + 30,
        behavior: "smooth",
      });
    }

    if (event.key === "ArrowUp") {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollTop - 30,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="fixed bottom-0 left-0 bg-blue-bg w-full min-h-15vh">
      <div className="bg-white w-full h-1"></div>
      <div className="flex flex-col px-16 py-3">
        <span>## 수정/생성 완료(submit)</span>
        <span>
          {`## 취소(b) 제목 수정(title) 새 글 단락 추가(text) ${
            postMode === "new" ? "사진 첨부" : "사진 추가"
          }(image) ${
            postMode === "new" ? "동영상 첨부" : "동영상 추가"
          }(video) 요소 수정(번호 go) 명령어입력창(esc / escape)`}
        </span>

        <div className="mt-2">
          <label>
            명령어 {">>"}
            <Input
              ref={commandInputRef}
              className="ml-2 outline-none w-4/5"
              type="text"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

PostDos.propTypes = {
  handleAddContent: PropTypes.func.isRequired,
  contentRefs: PropTypes.object.isRequired,
};

export default PostDos;
