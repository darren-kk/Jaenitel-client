import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

import Modal from "./shared/Modal";
import Input from "./shared/Input";
import Button from "./shared/Button";

import { showModalAtom } from "../atoms/loginAtoms";

function ModemModal() {
  const setShowModal = useSetAtom(showModalAtom);

  const navigate = useNavigate();

  const [modemInput, setModemInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  const audioElementRef = useRef(new Audio("/assests/MP_Modem.mp3"));

  const modemDialNumber = "00410";
  const interval = 500;

  useEffect(() => {
    if (currentIndex < modemDialNumber.length) {
      const timer = setTimeout(() => {
        setModemInput((prevInput) => prevInput + modemDialNumber[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, interval);

      return () => clearTimeout(timer);
    }

    setIsFocused(true);

    setTimeout(() => {
      setIsConnecting(true);
    }, interval);
  }, [currentIndex]);

  useEffect(() => {
    const audioElement = audioElementRef.current;

    const handleAudioEnd = () => {
      setShowModal(false);
      navigate("/login");
    };

    if (!isMuted && isConnecting) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    audioElement.addEventListener("ended", handleAudioEnd);

    return () => {
      audioElement.removeEventListener("ended", handleAudioEnd);
    };
  }, [isConnecting, isMuted, navigate, setShowModal]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "M" || event.key === "m") {
        setIsMuted(!isMuted);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <Modal title="재니텔에 연결">
      {isConnecting ? (
        <div className="flex flex-col items-center w-96 h-32 p-10 cursor-default">
          <div className="flex justify-start items-center w-full">
            <img className="w-10 h-10 mr-10" src="/assests/modemDial.png" alt="modem Dial" />
            <span className="text-black">01410에 전화 거는 중...</span>
          </div>
          <Button className="border-button w-24 text-black mt-2" type="button" onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? "재생(m)" : "일시정지(m)"}
          </Button>
        </div>
      ) : (
        <div className="px-14 py-9 cursor-default">
          <img className="pt-5" src="/assests/modemImage.png" alt="modem Image" />
          <div className="flex flex-col w-full">
            <label className="text-black">
              모뎀 전화 연결 :
              <Input
                className="bg-white w-4/5 my-10 ml-2 pl-2 border-input"
                type="text"
                value={modemInput}
                readOnly={true}
              />
            </label>
            <div className="absolute flex bottom-0 right-0 text-black mb-5 mr-8">
              <Button className="border-button w-32 m-1">종료(X)</Button>
              <Button className={`border-button w-32 m-1 ${isFocused ? "ring-4 ring-blue-bg" : ""}`}>
                전화걸기(D)
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ModemModal;
