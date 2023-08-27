import { useState, useRef, useEffect } from "react";
import { useSetAtom } from "jotai";

import Modal from "./shared/Modal";
import Button from "./shared/Button";
import Video from "./shared/Video";
import Input from "./shared/Input";
import Image from "./shared/Image";

import { modalStateAtom, videoRefAtom, scrollRefAtom, titleRefAtom } from "../atoms";
import usePostMessage from "../apis/postMessage";

function NewMessageModal() {
  const [messageInfo, setMessageInfo] = useState({
    sendTo: "",
    contents: [{ textContent: "" }],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const postMessage = usePostMessage(messageInfo);

  const setModalState = useSetAtom(modalStateAtom);
  const setScrollRef = useSetAtom(scrollRefAtom);
  const setVideoRef = useSetAtom(videoRefAtom);
  const setTitleRef = useSetAtom(titleRefAtom);

  const scrollRef = useRef(null);
  const videoRef = useRef(null);
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
  }, [messageInfo?.contents?.length]);

  useEffect(() => {
    async function handleKeydown(event) {
      if (event.key === "ArrowDown") {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollTop + 30,
        });
      }

      if (event.key === "ArrowUp") {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollTop - 30,
        });
      }

      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === "'") {
        handleAddContent("textContent");
      }

      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === ".") {
        handleAddContent("imageContent");
      }

      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === ",") {
        handleAddContent("videoContent");
      }

      if (event.metaKey && event.shiftKey && !isNaN(event.key) && Number(event.key) >= 0) {
        const index = Number(event.key) - 1;

        if (contentRefs.current[index]) {
          contentRefs.current[index].focus();
        }
      }

      if ((event.metaKey || event.ctrlKey) && event.key === "p") {
        videoRef.current.play();
      }

      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        videoRef.current.pause();
      }

      if ((event.metaKey || event.ctrlKey) && event.key === "x") {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }

      if ((event.metaKey || event.ctrlKey) && event.key === "u") {
        setModalState({ isOpen: false, messageId: null });
      }

      if ((event.metaKey || event.ctrlKey) && event.key === "o") {
        try {
          await postMessage();
        } catch (error) {
          if (error.message.startsWith("Receiver")) {
            setErrorMessage("닉네임이 일치하지 않습니다.");
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [postMessage, setModalState]);

  function handleAddContent(contentType) {
    setMessageInfo((prev) => ({
      ...prev,
      contents: [...prev.contents, { [contentType]: "" }],
    }));
  }

  function handleContentChange(event, index, contentType) {
    const newContents = [...messageInfo.contents];

    if (contentType === "imageContent" || contentType === "videoContent") {
      newContents[index][contentType] = event.target.files[0];
    }

    if (contentType === "textContent") {
      newContents[index][contentType] = event.target.value;
    }

    setMessageInfo({ ...messageInfo, contents: newContents });
  }

  function autoResizeTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      contentRefs.current[0].focus();
    }
  }

  return (
    <div className="flex">
      <Modal title="쪽지 보내기">
        <div className="w-55vh h-75vh py-10 px-4">
          <div className="flex flex-col h-full m-2">
            <label className="text-black mb-2">
              보낼 사람:
              <Input
                ref={titleRef}
                className="flex-items-start bg-white text-black w-full h-6 pl-2 border-input"
                type="text"
                value={messageInfo.sendTo}
                onChange={(event) => setMessageInfo({ ...messageInfo, sendTo: event.target.value })}
                onKeyDown={handleKeyDown}
              />
            </label>
            <span className="text-black mb-2">메시지 내용:</span>
            <div ref={scrollRef} className="bg-white w-full h-full text-black mb-8 overflow-auto">
              {messageInfo?.contents?.map((content, index) => {
                const keys = Object.keys(content);
                const contentType = keys[0] === "_id" ? keys[1] : keys[0];

                switch (contentType) {
                  case "textContent":
                    return (
                      <div key={index} className="flex w-full my-2">
                        <span className="text-black mr-2">{index + 1}</span>
                        <textarea
                          className="w-full max-h-40vh text-black mb-8"
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
                          className="text-sm h-8"
                          ref={(el) => (contentRefs.current[index] = el)}
                          onChange={(event) => handleContentChange(event, index, "imageContent")}
                        />
                        {content.imageContent && (
                          <Image className="max-h-30vh" src={URL.createObjectURL(content.imageContent)} alt="Preview" />
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
                          className="text-sm h-8"
                          ref={(el) => (contentRefs.current[index] = el)}
                          onChange={(event) => handleContentChange(event, index, "videoContent")}
                        />
                        {content.videoContent && (
                          <Video ref={videoRef} src={URL.createObjectURL(content.videoContent)} />
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
          <div className="absolute flex bottom-0 right-0 text-black mb-3 mr-4">
            <span className="text-red-600 mt-2 mr-4">{errorMessage}</span>
            <Button className={`border-button w-24 m-1`}>취소</Button>
            <Button className={`border-button w-24 m-1`}>전송</Button>
          </div>
        </div>
      </Modal>
      <Modal>
        <div className="fixed left-[66%] top-[12%] flex flex-col bg-gray-bg w-55vh text-black p-4">
          <h1 className="text-xl mb-4">명령어 모음</h1>
          <span>글 첨부(컨트롤 + 쉬프트 + 따옴표)</span>
          <span>사진 첨부(컨트롤 + 쉬프트 + {">"})</span>
          <span className="mb-4">동영상 첨부(컨트롤 + 쉬프트 + {"<"})</span>
          <span>보낼 사람 수정(컨트롤 + 쉬프트 + 숫자(0))</span>
          <span className="mb-4">수정 (컨트롤 + 쉬프트 + 번호)</span>
          <span>재생(컨트롤 + 쉬프트 + p)</span>
          <span>일시정지(컨트롤 + 쉬프트 + s)</span>
          <span className="mb-4">정지(컨트롤 + 쉬프트 + x)</span>
          <span>취소(컨트롤 + 쉬프트 + u)</span>
          <span>전송(컨트롤 + 쉬프트 + o)</span>
        </div>
      </Modal>
    </div>
  );
}

export default NewMessageModal;
