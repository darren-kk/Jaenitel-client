import MessageList from "../components/MessageList";

function Messages() {
  return (
    <div className="flex-center p-5">
      <header className="flex-center border-menu shadow-lg text-4xl w-4/5 h-20 mb-12">쪽지</header>
      <main className="flex justify-between items-center w-4/5 p-10">
        <MessageList type="received" />
        <MessageList type="sended" />
      </main>
    </div>
  );
}

export default Messages;
