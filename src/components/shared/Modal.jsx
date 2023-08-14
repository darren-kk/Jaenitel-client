import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import Button from "./Button";

function Modal({ children, title }) {
  return createPortal(
    <div className="fixed flex-center left-0 right-0 top-0 bottom-0 bg-opacity-50 z-1">
      <div className="flex-center relative h-auto w-auto bg-gray-bg border-2 overflow-auto">
        <div className="absolute top-0 flex justify-between text-sm bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end w-full pl-4 pr-2 py-1">
          {title}
          <Button className="flex justify-center items-center border-b-black border-r-black border-2 w-5 h-5 shadow-md overflow-auto">
            <div className="bg-gray-bg w-full text-black text-lg font-bold">X</div>
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}

Modal.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default Modal;
