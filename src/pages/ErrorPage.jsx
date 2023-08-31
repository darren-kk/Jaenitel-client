import { useEffect } from "react";

import PropTypes from "prop-types";

import { asciiArts } from "../constants";

function ErrorPage({ error, resetErrorBoundary }) {
  const errorOccured = asciiArts.errorOccured;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "t") {
        resetErrorBoundary();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [resetErrorBoundary]);

  return (
    <div className="flex-center w-full h-4/5 p-10 animate-slideFadeIn">
      <pre className="mb-10">{errorOccured}</pre>
      <header className="flex-between border border-4 border-white w-4/5 h-96 mb-10 p-10">
        <h1 className="text-3xl mb-20">통신 장애가 발생 했습니다!</h1>
        <div className="flex flex-col">
          <h2 className="text-2xl mb-10">
            {error?.response.status} :{error?.response.statusText}
          </h2>
          <h2 className="text-2xl">t를 입력해 처음 화면으로 돌아갈 수 있습니다.</h2>
        </div>
      </header>
    </div>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};

export default ErrorPage;
