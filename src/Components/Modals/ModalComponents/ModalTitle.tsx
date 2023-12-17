import React from "react";

type ModalTitleProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"h3">;

const ModalTitle = ({ children, ...props }: ModalTitleProps) => {
  return (
    <h3 className={`capitalize text-lg   text-black dark:text-white ${props.className}`}>
      {children}
    </h3>
  );
};

export default ModalTitle;
