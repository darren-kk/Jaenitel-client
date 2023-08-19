import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import useGetPosts from "../apis/getPosts";

import { currentPageAtom, postsPerPageAtom, scrollRefAtom, videoRefAtom } from "../atoms";
import { boardNames } from "../constants";

import Video from "../components/shared/Video";

function Post() {
  const { boardName, postNumber } = useParams();
  const currentPage = useAtomValue(currentPageAtom);
  const postsPerPage = useAtomValue(postsPerPageAtom);
  const setScrollRef = useSetAtom(scrollRefAtom);
  const setVideoRef = useSetAtom(videoRefAtom);

  const scrollRef = useRef(null);
  const videoRef = useRef(null);

  const { posts } = useGetPosts(boardName, currentPage, postsPerPage);
  const post = posts?.find((post) => post.index === Number(postNumber));

  useEffect(() => {
    if (videoRef) {
      setVideoRef(videoRef);
    }

    if (scrollRef) {
      setScrollRef(scrollRef);
    }
  }, [setScrollRef, setVideoRef]);

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
      <main ref={scrollRef} className="flex-start w-full h-65vh px-4 py-4 overflow-auto">
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
            return <Video ref={videoRef} key={content._id} src={content.videoUrl} />;
          }
        })}
      </main>
    </div>
  );
}

export default Post;
