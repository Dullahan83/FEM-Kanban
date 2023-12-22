import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import ModalTitle from "./ModalComponents/ModalTitle";
import Modalnput from "./ModalComponents/Modalnput";
import ModalList from "./ModalComponents/ModalList";
import ModalButton from "../Shared/Button";
import useStore from "../../Hooks/useStore";
import { IColumn } from "../../Utils/Types";
import {v4 as uuid} from 'uuid'

interface EditBoardModalProps extends ComponentPropsWithoutRef<"dialog"> {
  onClose: () => void;
}
const EditBoardModal = forwardRef<HTMLDialogElement, EditBoardModalProps>(
  ({ onClose }, ref) => {
    const {updateBoard, currentBoard} = useStore()
    const formRef = React.useRef<HTMLFormElement>(null);
    const modalBody = React.useRef<HTMLDivElement>(null)
    const [columns, setColumns] = React.useState<IColumn[]>([]);
    const [hasError, setHasError] = React.useState(false);
    const [errorOrigin, setErrorOrigin] = React.useState("");
    const [formFields, setFormFields] = React.useState<HTMLInputElement[]>([]);


    const handleClick = (e:React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
      const target = e.target as Node

      if (modalBody.current && !modalBody.current.contains(target) ) {
        onClose();
      }
    }
    

    const onSubmit = () => {
      if (formRef.current) {
        let shouldSkip = false;
        formFields.forEach((field) => {
          if (shouldSkip) return;
          if (field.value === "") {
            setHasError(true);
            setErrorOrigin(field.name);
            shouldSkip = true;
          }
        });
        if (hasError || shouldSkip) return;
        else {
          handleEditBoard()
          onClose()
          formRef.current.reset()
        }
      }
    };
    const handleAddCol = () => {
      setColumns((prev) => [...prev, {id: uuid(),name: "", tasks: []}]);
    };
    const handleEditBoard = () => {
      if(formRef.current){
        const nameInput = formRef.current.nameInput
        const board = {
          id: uuid(),
          name: nameInput.value,
          columns: columns
        }
        updateBoard(board, currentBoard.id)
      }
    }

    React.useEffect(() => {
      if(currentBoard){
        setColumns([...currentBoard.columns])
      }
    }, [currentBoard?.name, currentBoard])
    
    
    return (
      <dialog
      id="EditBoardModal"
      onClick={handleClick}
        ref={ref}
        className={
          "min-w-full fixed top-0 min-h-screen bg-black/50 text-black dark:text-white open:flex open:flex-col items-center justify-center"
        }
      >
        <div ref={modalBody} className=" w-85.5 md:w-480 p-6 pb-8 md:p-8 bg-white dark:bg-darkGrey max-w-[480px] rounded-md">
          <form
            ref={formRef}
            className="text-mediumGrey dark:text-white flex flex-col "
          >
            <ModalTitle className="mb-6 leading-tight">edit board</ModalTitle>
            <Modalnput
              setFormFields={setFormFields}
              errorOrigin={errorOrigin}
              hasError={hasError}
              id="EditNameInput"
              label="Name"
              name="nameInput"
              type="text"
              placeholder="e.g. Web Design"
              defaultValue={currentBoard?.name}
            />
            {columns?.length ? 
            <ModalList
              setFormFields={setFormFields}
              formFields={formFields}
              hasError={hasError}
              setHasError={setHasError}
              errorOrigin={errorOrigin}
              setErrorOrigin={setErrorOrigin}
              itemPlaceholder="Column Name"
              label="Board Columns"
              list={columns}
              setList={setColumns}
              className="mt-6"
            /> : null}
            <ModalButton onClick={handleAddCol} type="button" variant="Add" className="mb-6 mt-3">
              + add new column
            </ModalButton>
            <ModalButton onClick={onSubmit} type="button" variant="Validate">
              save changes
            </ModalButton>
          </form>
        </div>
      </dialog>
    );
  }
);

EditBoardModal.displayName = "Edit Board Modal";

export default EditBoardModal;
