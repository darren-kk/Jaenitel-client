import PropTypes from "prop-types";

function Input({ className, type, value, onChange, onKeyDown }) {
  return (
    <input
      className={`bg-transparent text-white ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default Input;
