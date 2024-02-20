import { forwardRef, ForwardedRef, ChangeEventHandler, KeyboardEventHandler } from "react";

interface InputProps {
  className?: string;
  type?: string;
  value?: string;
  readOnly?: boolean;
  accept?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const InputRef = (
  { className, type, value, readOnly = false, accept, onChange, onKeyDown }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <input
      autoComplete="off"
      ref={ref}
      className={`bg-transparent ${className}`}
      type={type}
      value={value}
      readOnly={readOnly}
      accept={accept}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(InputRef);

export default Input;
