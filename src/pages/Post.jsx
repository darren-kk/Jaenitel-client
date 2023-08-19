import { useParams } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";

import useGetPosts from "../apis/getPosts";

import { useRef } from "react";

import { currentPageAtom, postsPerPageAtom, scrollRefAtom } from "../atoms";
import { boardNames } from "../constants";

function Post() {
  const { boardName, postNumber } = useParams();
  const [currentPage] = useAtom(currentPageAtom);
  const [postsPerPage] = useAtom(postsPerPageAtom);
  const setScrollRef = useSetAtom(scrollRefAtom);

  const scrollRef = useRef(null);

  const { posts } = useGetPosts(boardName, currentPage, postsPerPage);
  const post = posts?.find((post) => post.index === Number(postNumber));

  if (scrollRef) {
    setScrollRef(scrollRef);
  }

  return (
    <div className="flex-center pt-5">
      <header className="flex-center w-full h-20vh pt-5 mb-4">
        <div className="flex-center border-menu shadow-lg text-4xl w-4/5 mb-6">{boardNames[boardName]}</div>
        <div className="w-full pl-4">
          <div className="w-full">
            <span className="text-xl w-5/12">제목: {post?.title}</span>
          </div>
          <div className="flex w-full">
            <span className="text-xl w-3/12">작성자: {post?.madeBy.nickname}</span>
            <span className="text-xl w-4/12">작성일: {post?.createdDate.split("T")[0]}</span>
          </div>
        </div>
      </header>
      <div className="bg-white w-full h-1 mb-2"></div>
      <main ref={scrollRef} className="flex-start w-full h-65vh px-10 py-4 overflow-auto">
        {post?.contents.map((content, index) => {
          if (content.content) {
            return (
              <pre className="font-dung-guen-mo max-h-40vh mb-8" key={content._id}>
                {content.content}
              </pre>
            );
          }
          if (content.imageUrl) {
            return (
              <img className="max-h-40vh mb-8" key={content._id} src={content.imageUrl} alt={`Content ${index}`} />
            );
          }
          if (content.videoUrl) {
            return (
              <video className="max-h-40vh mb-8" key={content._id} controls>
                <source src={content.videoUrl} type="video/mp4" />
              </video>
            );
          }
        })}
      </main>
    </div>
  );
}

export default Post;
