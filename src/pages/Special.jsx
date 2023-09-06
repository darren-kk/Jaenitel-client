import { asciiArts } from "../constants";

function Special() {
  const selfie = asciiArts.selfie;

  return (
    <div className="flex-center pt-5 animate-slideFadeIn">
      <header className="flex-center w-full h-10vh pt-5 mb-4">
        <div className="flex-center border-menu shadow-lg text-4xl w-4/5 mb-6">안녕하세요, 김재환입니다.</div>
      </header>
      <div className="bg-white w-full h-1 mb-2"></div>
      <main className="flex-row-start w-full h-65vh overflow-auto">
        <div className="w-full p-4">
          <div className="flex justify-center items-start w-full px-10">
            <pre className="flex justify-end text-xs w-2/6 pr-10 animate-slideFadeIn">{selfie}</pre>
            <div className="flex-items-start w-4/6 pt-4">
              <div className="flex-items-start w-4/6 pt-4">
                <h2 className="text-4xl pl-1 mb-4">연락처</h2>
                <span className="text-xl mb-2">전화번호: +82 010 2702 8138</span>
                <span className="text-xl mb-2">이-메일: rlawoghks10@gmail.com</span>
              </div>
              <div className="flex-items-start w-4/6 pt-4">
                <h2 className="text-4xl pl-1 mb-4">깃-허브</h2>
                <span className="text-xl mb-2">주소: https://github.com/darren-kk</span>
                <span className="text-xl mb-2">클라이언트: https://github.com/darren-kk/Jaenitel-client</span>
                <span className="text-xl mb-2">써버: https://github.com/darren-kk/Jaenitel-server</span>
              </div>
              <div className="flex-items-start w-full pt-4 overflow-auto">
                <h2 className="text-4xl pl-1 mb-4">제작 동기</h2>
                <p className="flex-shrink-0">
                  저는 평소에 음악을 굉장히 좋아합니다. 단순 음악에 그치지 않고 음악을 듣는 계기, 장소, 기기, 등 다양한
                  요소들에 따라 다르게 들리는 음악을 좋아합니다. 우연한 계기로 LP를 통해 음악을 처음 들었던 날, 그
                  매력에 깊이 빠져 조금씩 LP를 사모으는 취미도 생겼습니다. 근데 이 LP가 실제로 들으려면 굉장히
                  불편합니다. 듣기 위해선 준비물도 많고, 직접 플레이어에 판을 올리고 바늘을 얹어 주어야 하며 한바닥이 다
                  돌고나면 판도 뒤집어 주어야 나머지를 들을 수 있습니다. 하지만 복잡한 과정을 거친 탓인지, 그 과정 끝에
                  듣는 음악은 무언가 더 특별한 기분이 듭니다. 결과물을 돋보이게 해주는 과정이라 생각하면 그 과정도
                  굉장히 즐거워집니다. 제 프로젝트는 이 불편한 과정에서 시작 되었습니다. 하루가 다르게 빨라지고 좋아지는
                  성능들 속에서, 의도적으로 사용자에게 불편함을 주면 굉장히 매력적이지 않을까? LP를 통해 불편한 과정을
                  거쳐 음악을 듣는것 처럼, 주어진 불편함에 타당한 근거가 있다면 사용자도 불편함을 되려 즐겁게 느끼고
                  결과물을 더욱 즐길 수 있지 않을까? 그렇게 저는 불편함 속에서 즐거움을 찾기 위해 예전 PC통신을 재해석한
                  프로젝트를 시작하게 되었습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Special;
