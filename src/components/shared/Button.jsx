import PropTypes from "prop-types";

function Button({ className, type, children, onClick }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
