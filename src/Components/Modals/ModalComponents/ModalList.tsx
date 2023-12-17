import React from "react";
import ModalListItem from "./ModalListItem";
import { IColumn, ISubTasks } from "../../../Utils/Types";

type ModalListProps = {
  label: string;
  list: IColumn[];
  setList: React.Dispatch<React.SetStateAction<IColumn[]>>;
  itemPlaceholder: string;
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  errorOrigin: string;
  setErrorOrigin: React.Dispatch<React.SetStateAction<string>>;
  setFormFields: React.Dispatch<React.SetStateAction<HTMLInputElement[]>>;
  formFields: HTMLInputElement[]
} & React.ComponentPropsWithoutRef<"div">;

const ModalList = ({
  label,
  list,
  itemPlaceholder,
  setList,
  errorOrigin,
  setErrorOrigin,
  hasError,
  setHasError,
  setFormFields,
  formFields, ...props
}: ModalListProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    name: string
  ) => {
    setList((prev) => {
       // Créez une copie du tableau précédent
    const newList = [...prev];
    // Mettez à jour seulement la propriété 'name' de l'objet IColumn
    newList[index] = { ...newList[index], name: e.target.value };
    return newList;
    });
    if (e.target.value === "") {
      setHasError(true);
      setErrorOrigin(name);
    } else setHasError(false);
  };

  return (
    <div {...props}>
      <p className="mb-2 text-sm leading-tight">{label}</p>
      <div className="flex flex-col gap-y-3">
        {list?.map((item, index) => {
          return (
            <ModalListItem
              setFormFields={setFormFields}
              formFields={formFields}
              hasError={hasError}
              errorOrigin={errorOrigin}
              name={`${label}-input${index}`}
              placeholder={itemPlaceholder}
              key={index}
              defaultValue={item.name}
              onClick={() =>
                setList((prev) => prev.filter((_, i) => i !== index))
              }
              onChange={(e) => handleChange(e, index, `${label}-input${index}`)}
              className="w-full px-4 py-2 border border-mediumGrey/25 rounded-smd bg-inherit outline-none leading-5.5 text-black dark:text-white text-mds placeholder:text-black/25 dark:placeholder:text-white/25"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ModalList

type ModalListTaskProps = {
  label: string;
  list: ISubTasks[];
  setList: React.Dispatch<React.SetStateAction<ISubTasks[]>>;
  itemPlaceholder: string;
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  errorOrigin: string;
  setErrorOrigin: React.Dispatch<React.SetStateAction<string>>;
  setFormFields: React.Dispatch<React.SetStateAction<HTMLInputElement[]>>;
  formFields: HTMLInputElement[]
};

export const ModalListTask = ({
  label,
  list,
  itemPlaceholder,
  setList,
  errorOrigin,
  setErrorOrigin,
  hasError,
  setHasError,
  setFormFields,
  formFields
}: ModalListTaskProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    name: string
  ) => {
    setList((prev) => {
       // Créez une copie du tableau précédent
    const newList = [...prev];
    // Mettez à jour seulement la propriété 'name' de l'objet IColumn
    newList[index] = { ...newList[index], title: e.target.value };
    return newList;
    });
    if (e.target.value === "") {
      setHasError(true);
      setErrorOrigin(name);
    } else setHasError(false);
  };

  return (
    <div >
      <p className="mb-2 text-sm leading-tight">{label}</p>
      <div className="flex flex-col gap-y-3">
        {list?.map((item, index) => {
          return (
            <ModalListItem
              setFormFields={setFormFields}
              formFields={formFields}
              hasError={hasError}
              errorOrigin={errorOrigin}
              name={`${label}-input${index}`}
              placeholder={itemPlaceholder}
              key={index}
              defaultValue={item.title}
              onClick={() =>
                setList((prev) => prev.filter((_, i) => i !== index))
              }
              onChange={(e) => handleChange(e, index, `${label}-input${index}`)}
              className="w-full px-4 py-2 border border-mediumGrey/25 rounded-smd bg-inherit outline-none leading-5.5 text-black dark:text-white text-mds placeholder:text-black/25 dark:placeholder:text-white/25"
            />
          );
        })}
      </div>
    </div>
  );
};

