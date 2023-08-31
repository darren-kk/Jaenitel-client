import PropTypes from "prop-types";

function Button({ className, type, children, onClick, style }) {
  return (
    <button type={type} className={className} onClick={onClick} style={style}>
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
  style: PropTypes.string,
};

export default Button;
