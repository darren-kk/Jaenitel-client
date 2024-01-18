interface ButtonProps {
  className?: string;
  type?: "submit" | "button";
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ className, type, children, onClick }: ButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
