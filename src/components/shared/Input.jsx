import PropTypes from "prop-types";
import { forwardRef } from "react";

function Input({ className, type, value, readOnly = false, onChange, onKeyDown }, ref) {
  return (
    <input
      ref={ref}
      className={`bg-transparent ${className}`}
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

const InputRef = forwardRef(Input);

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default InputRef;
