import React from "react";

type ModalButtonProps = {
  variant?: "Add" | "Validate" | "Delete" | "Cancel" | "Base" | "Mobile";
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;

const Button = ({ variant, children, ...props }: ModalButtonProps) => {
  switch (variant) {
    case "Add":
      return (
        <button
          {...props}
          className={`w-full rounded-full capitalize bg-primary/10 dark:bg-white hover:bg-primary/25 py-2 text-mds leading-6 text-primary ${props.className}`}
        >
          {children}
        </button>
      );
    case "Validate":
      return (
        <button
          {...props}
          className="w-full rounded-full capitalize bg-primary hover:bg-primary-hover py-2 text-mds leading-6 text-white"
        >
          {children}
        </button>
      );
    case "Base":
      return (
        <button
          {...props}
          className={`capitalize flex text-white text-md bg-primary  hover:bg-primary-hover disabled:opacity-25 disabled:hover:bg-primary px-6 py-3.5 pr-[25px] rounded-3xl leading-5 ${props.className}`}
        >
          {children}
        </button>
      );
    case "Delete":
      return (
        <button
          {...props}
          className={`capitalize  w-full justify-center flex text-white text-mds bg-secondary  hover:bg-secondary-hover disabled:opacity-25 disabled:hover:bg-primary px-6 py-2  rounded-3xl leading-6 ${props.className}`}
        >
          {children}
        </button>
      );
    case "Cancel":
      return (
        <button
          {...props}
          className={`capitalize w-full justify-center flex text-mds bg-primary/10 text-primary dark:bg-white  hover:bg-white disabled:opacity-25 disabled:hover:bg-primary px-6 py-2  rounded-3xl leading-6 ${props.className}`}
        >
          {children}
        </button>
      );
      case "Mobile":
        return (
          <button
            {...props}
            className={`capitalize flex text-white text-md bg-primary  hover:bg-primary-hover disabled:opacity-25 disabled:hover:bg-primary px-4.5 py-2.5  rounded-3xl leading-5 ${props.className}`}
          >
            {children}
          </button>
        );
    default:
      return <button {...props}>{children}</button>;
  }
};

export default Button;
