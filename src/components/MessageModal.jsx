import { useRef, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";

import Modal from "./shared/Modal";
import Button from "./shared/Button";
import Video from "./shared/Video";
import Image from "./shared/Image";

import { modalStateAtom, videoRefAtom, scrollRefAtom } from "../atoms";
import useGetMessage from "../apis/getMessage";

function MessageModal() {
  const [modalState, setModalState] = useAtom(modalStateAtom);
  const setScrollRef = useSetAtom(scrollRefAtom);
  const setVideoRef = useSetAtom(videoRefAtom);

  const scrollRef = useRef(null);
  const videoRef = useRef(null);

  const { message } = useGetMessage(modalState.messageId);

  useEffect(() => {
    if (videoRef) {
      setVideoRef(videoRef);
    }

    if (scrollRef) {
      setScrollRef(scrollRef);
    }
  }, [setScrollRef, setVideoRef]);

  useEffect(() => {
    const handleKeydown = (event) => {
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

      if (event.key === "p") {
        videoRef.current.play();
      }

      if (event.key === "s") {
        videoRef.current.pause();
      }

      if (event.key === "q") {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }

      if (event.key === "o" || event.key === "O" || event.key === "ㅐ") {
        setModalState({ isOpen: false, messageId: null });
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [setModalState]);

  return (
    <Modal title="쪽지">
      <div className="w-96 h-80vh py-10 px-4">
        <div className="flex-items-start mt-2 mb-4">
          <span className="text-black mb-2">보낸 사람 :</span>
          <span className="flex-items-start bg-white text-black w-full h-6 pl-2 border-input">
            {message?.sendFrom.nickname}
          </span>
        </div>

        <div className="flex-items-start h-5/6 slide-fade-in">
          <span className="text-black mb-2">메시지 내용:</span>
          <div ref={scrollRef} className="bg-white w-full h-full p-2 border-input overflow-auto">
            {message?.contents.map((content, index) => {
              if (content.textContent) {
                return (
                  <pre className="font-dung-guen-mo text-black mb-8" key={content._id + index}>
                    {content.textContent}
                  </pre>
                );
              }
              if (content.imageContent) {
                return (
                  <Image
                    className="max-h-30vh"
                    key={content._id + index}
                    src={content.imageContent}
                    alt={`Content ${index}`}
                  />
                );
              }
              if (content.videoContent) {
                return <Video ref={videoRef} key={content._id + index} src={content.videoContent} />;
              }
            })}
          </div>
        </div>
        <div className="text-black mt-2">
          <span className="mr-1">재생(p)</span>
          <span className="mr-1">일시정지(s)</span>
          <span>정지(q)</span>
        </div>
        <div className="absolute flex bottom-0 right-0 text-black mr-4">
          <Button className={`border-button w-24 m-1`}>확인(O)</Button>
        </div>
      </div>
    </Modal>
  );
}

export default MessageModal;
