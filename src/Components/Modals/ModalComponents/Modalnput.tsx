import React from "react";
import HelperText from "./HelperText";
import { cn } from "../../../Utils/func";

type ModalnputProps = {
  multiline?: boolean;
  classN?: string;
  label: string;
  hasError: boolean;
  errorOrigin: string;
  setFormFields: React.Dispatch<React.SetStateAction<HTMLInputElement[]>>;
} & React.ComponentPropsWithoutRef<"input"> &
  React.ComponentPropsWithoutRef<"textarea">;

const Modalnput = ({
  classN = "flex flex-col",
  label,
  hasError,
  errorOrigin,
  setFormFields,
  multiline = false,
  ...props
}: ModalnputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (inputRef.current && !multiline) {
      setFormFields(
        (prev) =>
          [...prev, inputRef.current].filter(
            (input) => input !== null
          ) as HTMLInputElement[]
      );
    }
  }, [hasError]);

  return (
    <div className={`${classN} h-fit leading-tight`}>
      <label className="mb-2 text-sm" htmlFor={props.id}>
        {label}
      </label>
      {!multiline ?<div className="relative w-full">
        <input
          ref={inputRef}
          {...props}
          className={cn(
            "w-full px-4 py-2 border border-mediumGrey/25 bg-inherit rounded-smd outline-none leading-5.5 text-black text-mds placeholder:text-black/25 dark:placeholder:text-white/25",
            { "border-secondary": hasError && errorOrigin === props.name }
          )}
        />

        {hasError && !multiline && errorOrigin === props.name ? (
          <HelperText />
        ) : null}
      </div>:
      <textarea
        ref={textAreaRef}
        {...props}
        className={cn(
          "w-full px-4 whitespace-pre resize-none h-28 py-2 border border-mediumGrey/25 bg-inherit rounded-smd outline-none leading-5.5 text-black dark:text-white text-mds placeholder:text-black/25 dark:placeholder:text-white/25",
          { "border-secondary": hasError && errorOrigin === props.name }
        )}
      ></textarea>}
    </div>
  );
};

export default Modalnput;
