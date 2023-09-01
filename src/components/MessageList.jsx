import PropTypes from "prop-types";

import useGetMessages from "../apis/getMessages";

function MessageList({ type }) {
  const { messages } = useGetMessages();

  function getDisplayText(message) {
    if (message.content.textContent) {
      return message.content.textContent.length > 10
        ? message.content.textContent.slice(0, 10) + "..."
        : message.content.textContent;
    }
    if (message.content.imageContent) {
      return "사진";
    }
    if (message.content.videoContent) {
      return "동영상";
    }
  }

  return (
    <section className="flex-start w-2/5 h-48">
      <h2 className="flex-row-center border-menu shadow-lg text-2xl w-3/5 h-12">
        {type === "received" ? "쪽지함" : "내가 보낸 쪽지"}
      </h2>
      <div className="flex-items-start py-4">
        {messages &&
          (type === "received" ? messages.receivedMessages : messages.sendedMessages).map((message, index) => (
            <div key={message._id + index.toString()}>
              <span className="text-xl mb-2 mr-4">{message.index}.</span>
              <span className="text-lg mb-2 mr-4">{getDisplayText(message)}</span>
              <span className="text-lg mb-2">##{message.nickname}</span>
              {type === "received" && (
                <img
                  className="inline w-6 h-6 ml-2"
                  src={`/assests/message_${message.read ? "open" : "closed"}.png`}
                  alt="message image"
                />
              )}
            </div>
          ))}
      </div>
    </section>
  );
}

MessageList.propTypes = {
  type: PropTypes.string.isRequired,
};

export default MessageList;
