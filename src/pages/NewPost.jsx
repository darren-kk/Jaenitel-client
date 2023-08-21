import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetAtom, useAtom } from "jotai";

import Input from "../components/shared/Input";
import Video from "../components/shared/Video";
import PostDos from "../components/PostDos";

import { boardNames } from "../constants";
import { videoRefAtom, scrollRefAtom, postInfoAtom, titleRefAtom } from "../atoms";
import { handlePostCommand } from "../utils/utils";

function NewPost() {
  const setVideoRef = useSetAtom(videoRefAtom);
  const setScrollRef = useSetAtom(scrollRefAtom);
  const setTitleRef = useSetAtom(titleRefAtom);
  const [postInfo, setPostInfo] = useAtom(postInfoAtom);

  const location = useLocation("");
  const path = location.pathname.split("/");
  const boardName = path[2];

  const videoRef = useRef(null);
  const scrollRef = useRef(null);
  const titleRef = useRef(null);
  const contentRefs = useRef([]);

  useEffect(() => {
    if (titleRef) {
      setTitleRef(titleRef);
      titleRef.current.focus();
    }

    if (videoRef) {
      setVideoRef(videoRef);
    }

    if (scrollRef) {
      setScrollRef(scrollRef);
    }
  }, [setScrollRef, setTitleRef, setVideoRef]);

  useEffect(() => {
    if (contentRefs.current.length > 1) {
      const lastIndex = contentRefs.current.length - 1;
      contentRefs.current[lastIndex]?.focus();
    }
  }, [postInfo.contents.length]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      contentRefs.current[0].focus();
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

  function handleAddContent(contentType) {
    setPostInfo((prev) => ({
      ...prev,
      contents: [...prev.contents, { [contentType]: "" }],
    }));
  }

  function handleContentChange(event, index, contentType) {
    const newContents = [...postInfo.contents];

    if (contentType === "imageContent" || contentType === "videoContent") {
      newContents[index][contentType] = event.target.files[0];
    }

    if (contentType === "textContent") {
      newContents[index][contentType] = event.target.value;
    }

    setPostInfo({ ...postInfo, contents: newContents });
  }

  function autoResizeTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  return (
    <div className="flex-center pt-5">
      <header className="flex-center w-full h-20vh pt-5">
        <div className="flex-center border-menu shadow-lg text-4xl w-4/5 mb-12">{boardNames[boardName]}</div>
        <div className="flex justify-between w-full pl-8 pb-2">
          <span className="text-xl w-2/12">게시글 쓰기</span>
        </div>
      </header>
      <div className="bg-white w-full h-1 mb-2"></div>
      <main ref={scrollRef} className="flex-start w-full h-60vh px-10 py-4 overflow-auto">
        <div className="flex flex-col m-2">
          <label>
            글 제목:
            <Input
              ref={titleRef}
              className="ml-2 mt-2 mb-8 outline-none w-4/5"
              type="text"
              value={postInfo.title}
              onChange={(event) => setPostInfo({ ...postInfo, title: event.target.value })}
              onKeyDown={handleKeyDown}
            />
          </label>
          <span>글 내용: </span>
          {postInfo.contents.map((content, index) => {
            const contentType = Object.keys(content)[0];

            switch (contentType) {
              case "textContent":
                return (
                  <div className="flex w-full my-2">
                    <span className="mr-2">{index + 1}</span>
                    <textarea
                      key={index}
                      className="bg-blue-bg w-full h-fit"
                      value={content.textContent}
                      ref={(el) => (contentRefs.current[index] = el)}
                      onChange={(event) => {
                        handleContentChange(event, index, "textContent");
                        autoResizeTextarea(event.target);
                      }}
                    ></textarea>
                  </div>
                );
              case "imageContent":
                return (
                  <div key={index} className="flex-col">
                    <span className="mr-2">{index + 1}</span>
                    <Input
                      type="file"
                      accept="image/*"
                      className="mb-4"
                      ref={(el) => (contentRefs.current[index] = el)}
                      onChange={(event) => handleContentChange(event, index, "imageContent")}
                    />
                    {content.imageContent && (
                      <img className="max-h-40vh mb-8" src={URL.createObjectURL(content.imageContent)} alt="Preview" />
                    )}
                  </div>
                );
              case "videoContent":
                return (
                  <div key={index} className="flex-col">
                    <span className="mr-2">{index + 1}</span>
                    <Input
                      type="file"
                      accept="video/*"
                      ref={(el) => (contentRefs.current[index] = el)}
                      onChange={(event) => handleContentChange(event, index, "videoContent")}
                    />
                    {content.videoContent && <Video ref={videoRef} src={URL.createObjectURL(content.videoContent)} />}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </main>
      <PostDos handlePostCommand={handlePostCommand} handleAddContent={handleAddContent} contentRefs={contentRefs} />
    </div>
  );
}

export default NewPost;
