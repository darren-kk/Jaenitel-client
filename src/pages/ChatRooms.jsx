import { useEffect, useRef } from "react";
import { useAtom } from "jotai";

import useGetChatRooms from "../apis/getChatrooms";

import { currentPageAtom, totalPageAtom, postsPerPageAtom } from "../atoms/pageAtoms";

function ChatRooms() {
  const [currentPage] = useAtom(currentPageAtom);
  const [totalPage] = useAtom(totalPageAtom);
  const [postsPerPage, setPostsPerPage] = useAtom(postsPerPageAtom);

  const mainRef = useRef(null);

  const { chatRooms, totalChatRooms } = useGetChatRooms(currentPage, postsPerPage);
  const totalUsers = chatRooms?.reduce((acc, chatRoom) => acc + chatRoom.users.length, 0) || 0;

  const pageNumbers = [];

  useEffect(() => {
    const postHeight = 90;

    const handleResize = () => {
      if (mainRef.current) {
        const mainHeight = mainRef.current.clientHeight;
        setPostsPerPage(Math.floor(mainHeight / postHeight));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mainRef, setPostsPerPage]);

  for (let i = 1; i <= Math.ceil(chatRooms?.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex-center pt-5 animate-slideFadeIn">
      <header className="flex-center w-full h-20vh pt-5">
        <div className="flex-center border-menu shadow-lg text-4xl w-4/5 mb-12">실시간 대화방</div>
        <div className="flex justify-start w-full pl-8 pb-2">
          <span className="text-xl w-2/12">대화방</span>
          <span className="text-xl w-3/12">개설 방 수: {totalChatRooms} / 99</span>
          <span className="text-xl w-4/12">현재 참여인원: {totalUsers}명</span>
        </div>
      </header>
      <div className="bg-white w-full h-1 mb-2"></div>
      <main ref={mainRef} className="flex-start w-full h-60vh px-10 py-4">
        {chatRooms?.map((chatRoom) => {
          const users = chatRoom.users;

          return (
            <div key={chatRoom._id} className="flex flex-col justify-between w-full h-16 mb-8">
              <div className="flex justify-start w-full mb-4">
                <span className="text-2xl w-1/12"># {chatRoom.index}</span>
                <span className="text-2xl w-5/12">{chatRoom.title}</span>
              </div>
              <div className="flex justify-start w-full">
                <span className="text-xl w-2/12">개설일: {chatRoom.createdDate.split("T")[0]}</span>
                <span className="text-xl mr-2">참여인원:</span>
                {users.map((user, index) => (
                  <span key={user._id} className="text-xl mr-4">
                    {index ? "/ " + user.nickname : user.nickname}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </main>
      <footer>
        <span className="text-xl">
          {currentPage} / {totalPage}
        </span>
      </footer>
    </div>
  );
}

export default ChatRooms;
