import { asciiArts } from "../constants";

function Special() {
  const selfie = asciiArts.selfie;

  return (
    <div className="flex-center pt-5 animate-slideFadeIn">
      <header className="flex-center w-full h-10vh pt-5 mb-4">
        <div className="flex-center border-menu shadow-lg text-4xl w-4/5 mb-6">스페-샬</div>
      </header>
      <div className="bg-white w-full h-1 mb-2"></div>
      <main className="flex-row-start w-full h-75vh overflow-auto">
        <div className="w-full p-4">
          <h1 className="w-full text-center text-6xl mb-8">안녕하세요, 김재환입니다.</h1>
          <div className="flex justify-center items-start w-full px-10">
            <pre className="flex justify-end text-xs w-2/6 pr-10 animate-slideFadeIn">{selfie}</pre>
            <div className="flex-items-start w-4/6 pt-4">
              <h2 className="text-4xl pl-1 mb-4">연락처</h2>
              <span className="text-xl mb-2">전화번호: +82 010 2702 8138</span>
              <span className="text-xl mb-2">이-메일: rlawoghks10@gmail.com</span>
              <div className="flex-items-start w-4/6 pt-4">
                <h2 className="text-4xl pl-1 mb-4">깃-허브</h2>
                <span className="text-xl mb-2">주소: https://github.com/darren-kk</span>
                <span className="text-xl mb-2">클라이언트: https://github.com/darren-kk/Jaenitel-client</span>
                <span className="text-xl mb-2">써버: https://github.com/darren-kk/Jaenitel-server</span>
              </div>
              <div className="flex-items-start w-4/6 pt-4">
                <h2 className="text-4xl pl-1 mb-4">주요 기술-목록</h2>
                <span className="text-xl mb-2">클라이언트: </span>
                <ul className="mb-4">
                  <li>리액트</li>
                  <li>리액트-쿼리</li>
                  <li>죠타이</li>
                  <li>소켓-아이오</li>
                  <li>테일-윈드</li>
                </ul>
                <span className="text-xl mb-2">써버: </span>
                <ul className="mb-4">
                  <li>노드</li>
                  <li>익스프레스</li>
                  <li>몽고 디-비</li>
                  <li>소켓-아이오</li>
                  <li>아마존 에스 쓰리</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Special;
