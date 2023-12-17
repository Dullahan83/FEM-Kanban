import React, { ComponentPropsWithoutRef } from "react";

type IconProps = {
  size?: string;
  color?: string;
} & ComponentPropsWithoutRef<"svg">;

const ChevronIcon = ({ size = "16px",color="#635FC7", ...props }: IconProps) => {
  return (
    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path stroke={color} strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
    </svg>
  );
};

export default ChevronIcon;
