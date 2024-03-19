import { useEffect } from "react";

function useResize(mainRef, setItemsPerPage, itemHeight) {
  useEffect(() => {
    const handleResize = () => {
      if (mainRef.current) {
        const mainHeight = mainRef.current.clientHeight;
        setItemsPerPage(Math.floor(mainHeight / itemHeight));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mainRef, setItemsPerPage, itemHeight]);
}

export default useResize;
