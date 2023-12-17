import React from "react";
import CrossIcon from "../../Icons/CrossIcon";
import HelperText from "./HelperText";
import { cn } from "../../../Utils/func";

type ModalListItemProps = {
  classN?: string;
  onClick: () => void;
  btnType?: "button" | "submit" | "reset";
  hasError: boolean;
  errorOrigin: string;
  setFormFields: React.Dispatch<React.SetStateAction<HTMLInputElement[]>>
  formFields: HTMLInputElement[]
} & React.ComponentPropsWithoutRef<"input">;

const ModalListItem = ({
  classN = "flex w-full gap-x-4",
  onClick,
  btnType = "button",
  hasError,
  errorOrigin,
  setFormFields,
  formFields,
  ...props
}: ModalListItemProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if(inputRef.current && !formFields.includes(inputRef.current)){
        setFormFields(prev => [...prev, inputRef.current].filter(input => input !== null) as HTMLInputElement[])
    }
  },[hasError])

  return (
    <div className={`${classN} items-center`}>
      <div className="w-full relative">
        <input ref={inputRef} {...props} className={cn(props.className, 
            {"border-secondary": hasError && errorOrigin === props.name}
        )}/>
        {hasError && errorOrigin === props.name ? <HelperText /> : null}
      </div>
      <CrossIcon onClick={onClick} type={btnType} className="h-fit"/>
    </div>
  );
};

export default ModalListItem;
