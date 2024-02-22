interface ImageProps {
  className?: string;
  src: string;
  alt: string;
}

function Image({ className, src, alt }: ImageProps) {
  return <img className={`mb-8 animate-slideFadeInImage ${className}`} src={src} alt={alt} />;
}

export default Image;
