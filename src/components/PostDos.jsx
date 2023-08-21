import { useState, useRef, useEffect } from "react";
import { useAtomValue } from "jotai";
import PropTypes from "prop-types";

import Input from "./shared/Input";

import { videoRefAtom, scrollRefAtom, titleRefAtom, postInfoAtom } from "../atoms";
import useCreatePost from "../apis/createPost";

function PostDos({ handlePostCommand, handleAddContent, contentRefs }) {
  const [command, setCommand] = useState("");
  const commandInputRef = useRef(null);

  const scrollRef = useAtomValue(scrollRefAtom);
  const videoRef = useAtomValue(videoRefAtom);
  const titleRef = useAtomValue(titleRefAtom);
  const postInfo = useAtomValue(postInfoAtom);

  const createPost = useCreatePost(postInfo);

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

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      handlePostCommand(command, setCommand, handleAddContent, titleRef, videoRef, contentRefs, createPost);
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
        <span>## 글(text) 사진(image) 동영상(video) 이동(번호 / go) 돌아오기(컨트롤 + 쉬프트 + k(케이))</span>
        <div>
          <label>
            명렁어 {">>"}
            <Input
              ref={commandInputRef}
              className="ml-2 mb-2 outline-none w-4/5"
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
  handlePostCommand: PropTypes.func.isRequired,
  handleAddContent: PropTypes.func.isRequired,
  contentRefs: PropTypes.object.isRequired,
};

export default PostDos;
