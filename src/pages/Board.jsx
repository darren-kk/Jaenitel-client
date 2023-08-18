import { useLocation } from "react-router-dom";

import useGetPosts from "../apis/getPosts";

import { boardNames } from "../constants";

function Board() {
  const location = useLocation("");
  const path = location.pathname.split("/");
  const boardName = path[path.length - 1];

  const { posts, isLoading, isError, error } = useGetPosts(boardName);

  return (
    <div className="flex-center pt-5">
      <header className="flex-center border-menu shadow-lg text-4xl w-4/5 h-20 mb-12">{boardNames[boardName]}</header>
      <div className="flex justify-between w-full pl-8 pb-2">
        <span className="w-2/12">번호</span>
        <span className="w-3/12">이름</span>
        <span className="w-4/12">날짜</span>
        <span className="w-5/12">제목</span>
      </div>
      <div className="bg-white w-full h-1 mb-2"></div>
      <main className="flex-center items-center w-full p-10">
        {posts
          ?.slice()
          .reverse()
          .map((post, index) => (
            <div key={post.id} className="flex justify-between w-full mb-4">
              <span className="text-xl w-2/12">{posts.length - index}</span>
              <span className="text-xl w-3/12">{post.madeBy.nickname}</span>
              <span className="text-xl w-4/12">{post.createdDate.split("T")[0]}</span>
              <span className="text-xl w-5/12">{post.title}</span>
            </div>
          ))}
      </main>
    </div>
  );
}

export default Board;
