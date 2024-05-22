import React from "react";
import { variantConfig } from "../todo-item/constants";

type StyledButtonPropsType = {
  children: React.ReactNode;
  variant: "default" | "success" | "error";
  onClick?: () => void;
};

const StyledButton: React.FC<StyledButtonPropsType> = ({
  children,
  variant = "default",
  ...props
}) => {
  const { background } = variantConfig[variant];

  return (
    <button
      className="text-white text-sm px-2 py-1 rounded-md"
      style={{ background }}
      {...props}
    >
      {children}
    </button>
  );
};

export default StyledButton;
