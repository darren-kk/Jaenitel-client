import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useAtom, useAtomValue } from "jotai";
import PropTypes from "prop-types";

import Modal from "./shared/Modal";
import Button from "./shared/Button";

import { userAtom } from "../atoms/userAtom";
import { messageNotificationAtom } from "../atoms/messageAtoms";

const baseURL = import.meta.env.VITE_BASE_URL;

function SocketMessageWrapper({ children }) {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [messageNotification, setMessageNotification] = useAtom(messageNotificationAtom);

  useEffect(() => {
    function handleKeydown(event) {
      if (event.key === "o" || event.key === "O" || event.key === "ㅐ") {
        event.preventDefault();
        setMessageNotification(null);
      }
      if (event.key === "g" || event.key === "G" || event.key === "ㅎ") {
        setMessageNotification(null);
        navigate("boards/messages");
      }
    }
    if (messageNotification) {
      window.addEventListener("keydown", handleKeydown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [messageNotification, navigate, setMessageNotification]);

  useEffect(() => {
    const socket = io(baseURL);

    if (user) {
      socket.emit("join-message", user?.nickname);

      socket.on("messageNotification", (data) => {
        setMessageNotification(data);
      });
    }

    return () => {
      socket.emit("leave-message", user?.nickname);
      socket.off("messageNotification");
      socket.disconnect();
    };
  }, [messageNotification, setMessageNotification, user]);

  return (
    <>
      {messageNotification && (
        <Modal title="쪽지 알림">
          <div className="flex-row-center w-60vh h-20vh py-10 px-4">
            <div className="flex">
              <span className="text-lg text-black">
                {messageNotification?.sendFrom} 님으로 부터 쪽지가 도착했습니다.
              </span>
              <img className="inline w-6 h-6 ml-2" src="/assests/message_closed.png" alt="message image" />
            </div>
            <div className="absolute flex bottom-0 right-0 text-black mr-4">
              <Button className={`border-button w-48 m-1`}>쪽지함으로 이동(G)</Button>
              <Button className={`border-button w-24 m-1`}>확인(O)</Button>
            </div>
          </div>
        </Modal>
      )}
      {children}
    </>
  );
}

SocketMessageWrapper.propTypes = {
  children: PropTypes.any,
};

export default SocketMessageWrapper;
