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
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === "k") {
        commandInputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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
        if (command.endsWith(" go")) {
          const number = command.split(" ")[0];
          contentRefs.current[number - 1].focus();
        }
    }

    setCommand("");
  }

  async function handleKeyDown(event) {
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
        <span>
          ## 제출(submit) 제목(title) 글(text) 사진(image) 동영상(video) 이동(번호 / go) 돌아오기(ctrl + shift +
          k(케이))
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
