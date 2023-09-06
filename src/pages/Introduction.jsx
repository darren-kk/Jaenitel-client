import { useAtom } from "jotai";

import Button from "../components/shared/Button";
import ModemModal from "../components/ModemModal";

import { showModalAtom } from "../atoms/loginAtoms";

function Introduction() {
  const [showModal, setShowModal] = useAtom(showModalAtom);

  function handleClick() {
    setShowModal(true);
  }

  return (
    <div className="cursor-default">
      <div className="flex flex-col justify-start items-start w-full h-3/5 p-10">
        <p className="text-xl w-0 overflow-hidden whitespace-nowrap mb-8 animate-typewriter">
          안녕하세요! 재니텔에 방문해 주셔서 감사드립니다.
        </p>
        <p className="text-xl w-0 overflow-hidden whitespace-nowrap mb-8 animate-typewriter animation-delay-2">
          본 웹사이트는 하이텔, 나우누리 처럼 예전 피시 통신시절에 서비스 되던
        </p>
        <p className="text-xl w-0 overflow-hidden whitespace-nowrap mb-8 animate-typewriter animation-delay-4.5">
          추억의 서비스를 다시금 떠올리며 비슷한 경험을 할 수 있게끔 만들어진 사이트입니다.
        </p>
        <p className="text-xl w-0 overflow-hidden whitespace-nowrap mb-8 animate-typewriter animation-delay-7.5">
          그 시절이 그러했듯, 보다 실감나는 경험을 위하여, 저희 사이트에 입장하시면 마우스의 사용이 제한되며
        </p>
        <p className="text-xl w-0 overflow-hidden whitespace-nowrap mb-8 animate-typewriter animation-delay-11">
          등장하게 될 하단의 DOS 를 통하여 이용이 가능하시니, 이점 참고하시어 이용에 불편이 없으시길 바라겠습니다.
        </p>
        <p className="text-xl w-0 overflow-hidden whitespace-nowrap mb-8 animate-typewriter animation-delay-14.5">
          접속하기 버튼을 누르시고 난 뒤, 등장하는 팝업창에서 재생버튼을 클릭 혹은 m버튼을 눌러 모뎀 연결 소리를 청취
          하실 수 있으며
        </p>
        <p className="text-xl w-0 overflow-hidden whitespace-nowrap mb-8 animate-typewriter animation-delay-18.5">
          연결 소리가 끝나면 자동으로 페이지가 이동합니다.
        </p>
      </div>
      <div className="flex-center">
        <Button
          className="border-button w-32 m-1 bg-gray-bg text-xl text-black opacity-0 animate-slideFadeIn animation-delay-18.5"
          type="button"
          onClick={handleClick}
        >
          접속하기
        </Button>
      </div>
      {showModal && <ModemModal />}
    </div>
  );
}

export default Introduction;
