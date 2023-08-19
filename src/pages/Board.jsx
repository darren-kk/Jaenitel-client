import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAtom } from "jotai";

import useGetPosts from "../apis/getPosts";

import { currentPageAtom, totalPageAtom, postsPerPageAtom } from "../atoms";

import { boardNames } from "../constants";

function Board() {
  const [currentPage] = useAtom(currentPageAtom);
  const [totalPage] = useAtom(totalPageAtom);
  const [postsPerPage, setPostsPerPage] = useAtom(postsPerPageAtom);

  const mainRef = useRef(null);
  const location = useLocation("");

  const path = location.pathname.split("/");
  const boardName = path[path.length - 1];

  const { posts } = useGetPosts(boardName, currentPage, postsPerPage);

  const pageNumbers = [];

  useEffect(() => {
    const postHeight = 48;

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

  for (let i = 1; i <= Math.ceil(posts?.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex-center pt-5">
      <header className="flex-center w-full h-20vh pt-5">
        <div className="flex-center border-menu shadow-lg text-4xl w-4/5 mb-12">{boardNames[boardName]}</div>
        <div className="flex justify-between w-full pl-8 pb-2">
          <span className="text-xl w-2/12">번호</span>
          <span className="text-xl w-3/12">이름</span>
          <span className="text-xl w-4/12">날짜</span>
          <span className="text-xl w-5/12">제목</span>
        </div>
      </header>
      <div className="bg-white w-full h-1 mb-2"></div>
      <main ref={mainRef} className="flex-start w-full h-60vh px-10 py-4">
        {posts?.map((post) => (
          <div key={post._id} className="flex justify-between w-full h-7 mb-4">
            <span className="text-xl w-2/12">{post.index}</span>
            <span className="text-xl w-3/12">{post.madeBy.nickname}</span>
            <span className="text-xl w-4/12">{post.createdDate.split("T")[0]}</span>
            <span className="text-xl w-5/12 pl-4">{post.title}</span>
          </div>
        ))}
      </main>
      <footer>
        <span className="text-xl">
          {currentPage} / {totalPage}
        </span>
      </footer>
    </div>
  );
}

export default Board;
