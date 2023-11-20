import React from "react";
import './Button.css';

export type ButtonProps = {
    variant?: string,
    id: string,
    className: string,
    type?: "button" | "submit" | "reset",
    onClick?: () => void,
    form?: string,
    autoFocus?: boolean,
    disabled?: boolean,
    value?: string,
    children: React.ReactNode
};

export const Button = ({
    variant,
    id,
    className,
    type = 'button',
    onClick,
    form,
    autoFocus,
    disabled,
    value,
    children
}: ButtonProps) => {
  return (
    <button
      id={id}
      className={className}
      type={type}
      onClick={onClick}
      form={form}
      autoFocus={autoFocus}
      disabled={disabled}
      value={value}
    >
      {children}
    </button>
  );
};