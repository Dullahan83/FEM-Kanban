import React from "react";
import BoardIcon from "../Icons/BoardIcon";
import { cn } from "../../Utils/func";

type IProps = {
    
  children: React.ReactNode;
  selected?: boolean;
  create?: boolean
} & React.ComponentPropsWithoutRef<"li">;

const TabItem = ({ children, selected,create, ...props }: IProps) => {
  return (
    <li {...props}>
      <BoardIcon
        className={cn("mr-3 md:mr-4", {
            "fill-white": selected,
            "fill-[#828FA3] group-hover:fill-primary": !selected,
            "fill-primary group-hover:fill-mediumGrey": create,
        })}
      />
      {children}
    </li>
  );
};

export default TabItem;
