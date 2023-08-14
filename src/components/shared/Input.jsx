import PropTypes from "prop-types";

function Input({ className, type, value, readOnly = false, onChange, onKeyDown }) {
  return (
    <input
      className={`bg-transparent ${className}`}
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default Input;
