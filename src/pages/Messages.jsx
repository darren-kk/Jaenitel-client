import { useRef, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import MessageList from "../components/MessageList";
import MessageModal from "../components/MessageModal";
import NewMessageModal from "../components/NewMessageModal";

import { modalStateAtom } from "../atoms/messageAtoms";
import { scrollRefAtom } from "../atoms/refAtoms";

function Messages() {
  const scrollRef = useRef(null);
  const showMessageModal = useAtomValue(modalStateAtom);
  const setScrollRef = useSetAtom(scrollRefAtom);

  useEffect(() => {
    if (scrollRef) {
      setScrollRef(scrollRef);
    }
  }, [setScrollRef]);

  return (
    <div className="flex-center p-5 animate-slideFadeIn">
      <header className="flex-center border-menu shadow-lg text-4xl w-4/5 h-20 mb-12">쪽지</header>
      <main ref={scrollRef} className="flex justify-between items-start w-4/5 h-65vh p-10 overflow-auto">
        <MessageList type="received" />
        <MessageList type="sended" />
        {showMessageModal.isOpen && (showMessageModal.messageId === "new" ? <NewMessageModal /> : <MessageModal />)}
      </main>
    </div>
  );
}

export default Messages;
