import React from "react";
import './Button.css';

export type ButtonProps = {
    variant?: "default" | "square" | "rectangle" | "round" | "link",
    id: string,
    className?: string,
    size?: "medium" | "large" | "small"
    type?: "button" | "submit" | "reset",
    color?: "white" | "grey" | "green",
    backgroundImage?: string,
    onClick?: () => void,
    form?: string,
    autoFocus?: boolean,
    disabled?: boolean,
    value?: string,
    children: React.ReactNode
};

export const Button = ({
  variant = "default",
  id,
  type = 'button',
  size,
  color,
  backgroundImage,
  className,
  onClick,
  form,
  autoFocus,
  disabled,
  value,
  children
}: ButtonProps) => {
  const buttonStyle: React.CSSProperties = {
    backgroundImage: backgroundImage ? `url(${backgroundImage}) ` : 'none',
  };

  const buttonClassName = `button ${variant} ${color || ''} ${size} ${type} ${className || ''}`;

  return (
    <button
      id={id}
      className={buttonClassName}
      type={type}
      onClick={onClick}
      form={form}
      autoFocus={autoFocus}
      disabled={disabled}
      value={value}
      style={buttonStyle}
    >
      {children}
    </button>
  );
};