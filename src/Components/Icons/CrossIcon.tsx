import  { ComponentPropsWithoutRef } from "react";

type IconProps = {
  size?: string;
  color?: string;
} & ComponentPropsWithoutRef<"button">;

const CrossIcon = ({ size = "16px", ...props }: IconProps) => {
  return (
    <button {...props}>
        <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" className="fill-mediumGrey hover:fill-secondary">
            <g  fillRule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
        </svg>
    </button>
  );
};

export default CrossIcon;
