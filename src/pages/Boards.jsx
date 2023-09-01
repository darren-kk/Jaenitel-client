import { useEffect } from "react";

import { useSetAtom } from "jotai";

import { currentPageAtom, totalPageAtom } from "../atoms/pageAtoms";

function Boards() {
  const setCurrentPage = useSetAtom(currentPageAtom);
  const setTotalPage = useSetAtom(totalPageAtom);

  useEffect(() => {
    setCurrentPage(1);
    setTotalPage(1);
  }, [setCurrentPage, setTotalPage]);

  return (
    <div className="flex-center p-5  animate-slideFadeIn">
      <header className="flex-center border-menu shadow-lg text-4xl w-4/5 h-20 mb-12">메인 메뉴</header>
      <main className="flex justify-between items-center w-4/5 p-10">
        <section className="w-fit h-48">
          <h2 className="flex-row-center border-menu shadow-lg text-2xl w-60 h-12">Communication</h2>
          <div className="flex-items-start p-4">
            <span className="text-xl mb-2">1. 가입인사</span>
            <span className="text-xl mb-2">2. 쪽지</span>
            <span className="text-xl mb-2">3. 대화방</span>
          </div>
        </section>
        <section className="w-fit h-48">
          <h2 className="flex-row-center border-menu shadow-lg text-2xl w-60 h-12">Contents</h2>
          <div className="flex-items-start p-4">
            <span className="text-xl mb-2">11. 자유 게시판</span>
            <span className="text-xl mb-2">12. 유머 게시판</span>
          </div>
        </section>
        <section className="w-fit h-48">
          <h2 className="flex-row-center border-menu shadow-lg text-2xl w-60 h-12">Special</h2>
          <div className="flex-items-start p-4">
            <span className="text-xl mb-2">21. Special</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Boards;
