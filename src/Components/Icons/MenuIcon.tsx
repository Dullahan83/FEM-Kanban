import React from "react";

type MenuIconProps = {
    color?: string
} & React.ComponentPropsWithoutRef<"div">

const MenuIcon = ({color = "#828FA3", ...props}: MenuIconProps) => {
  return (
    <div {...props}>
        <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
        <g fill={color} fillRule="evenodd">
            <circle cx="2.308" cy="2.308" r="2.308" />
            <circle cx="2.308" cy="10" r="2.308" />
            <circle cx="2.308" cy="17.692" r="2.308" />
        </g>
        </svg>
    </div>
  );
};

export default MenuIcon;
