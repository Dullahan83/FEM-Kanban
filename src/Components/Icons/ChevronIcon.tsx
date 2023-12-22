import  { ComponentPropsWithoutRef } from "react";

type IconProps = {

  color?: string;
} & ComponentPropsWithoutRef<"svg">;

const ChevronIcon = ({ color="#635FC7", ...props }: IconProps) => {
  return (
    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path stroke={color} strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
    </svg>
  );
};

export default ChevronIcon;
