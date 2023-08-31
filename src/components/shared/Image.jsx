import PropTypes from "prop-types";

function Image({ className, src, alt }) {
  return <img className={`mb-8 animate-slideFadeInImage ${className}`} src={src} alt={alt} />;
}

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
