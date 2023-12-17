import React, { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import ModalTitle from "./ModalComponents/ModalTitle";
import Modalnput from "./ModalComponents/Modalnput";
import { ModalListTask } from "./ModalComponents/ModalList";
import ModalButton from "../Shared/Button";
import useStore from "../../Hooks/useStore";
import Dropdown from "./ModalComponents/Dropdown";
import { ISubTasks } from "../../Utils/Types";
import {v4 as uuid} from 'uuid'

interface NewTaskModalProps extends ComponentPropsWithoutRef<"dialog"> {
  onClose: () => void;
}
const NewTaskModal = forwardRef<HTMLDialogElement, NewTaskModalProps>(
  ({ onClose }, ref) => {
    const { createTask } = useStore();
    const formRef = React.useRef<HTMLFormElement>(null);
    const modalBody = React.useRef<HTMLDivElement>(null);
    const [columns, setColumns] = React.useState<ISubTasks[]>([
      {id: uuid(), title: "", isCompleted: false },
    ]);
    const [hasError, setHasError] = React.useState(false);
    const [errorOrigin, setErrorOrigin] = React.useState("");
    const [formFields, setFormFields] = React.useState<HTMLInputElement[]>([]);
    const [status, setStatus] = React.useState("");
    const [description, setDescription] = useState("");
    const handleClick = (
      e: React.MouseEvent<HTMLDialogElement, MouseEvent>
    ) => {
      const target = e.target as Node;

      if (modalBody.current && !modalBody.current.contains(target)) {
        onClose();
      }
    };

    const handleCreateTask = () => {
      if (formRef.current) {
        const nameInput = formRef.current.nameInput;
        const task = {
          id: uuid(),
          title: nameInput.value,
          description: description,
          status: status,
          subtasks: columns,
        };
        createTask(task);
      }
    };
    const onSubmit = () => {
      if (formRef.current) {
        let shouldSkip = false;
        formFields.forEach((field) => {
          if (shouldSkip) return;
          
          if (field.value === "") {
            setHasError(true);
            setErrorOrigin(field.name);
            shouldSkip = true;
            return
          }
        });
        if (hasError || shouldSkip) return;
        else {
          handleCreateTask();
          onClose();
          formRef.current?.reset();
          setColumns([{id:uuid(), title: "", isCompleted: false }]);
        }
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    };

    const handleAddCol = () => {
      setColumns((prev) => [...prev, { id: uuid(),title: "", isCompleted: false }]);
    };

    return (
      <dialog
        onClick={handleClick}
        ref={ref}
        className={
          "min-w-full fixed top-0 min-h-screen bg-black/50 text-black dark:text-white open:flex open:flex-col items-center justify-center"
        }
      >
        <div
          ref={modalBody}
          className="w-85.5 md:w-480 p-6 md:p-8 bg-white dark:bg-darkGrey max-w-[480px] rounded-md"
        >
          <form
            ref={formRef}
            className="text-mediumGrey dark:text-white flex flex-col gap-6"
          >
            <ModalTitle className="leading-tight">add new task</ModalTitle>
            <Modalnput
              setFormFields={setFormFields}
              errorOrigin={errorOrigin}
              hasError={hasError}
              id="nameInput"
              label="Name"
              name="nameInput"
              type="text"
              placeholder="e.g. Take coffee break"
              defaultValue={""}
            />
            <>
              <h3 className="text-sm leading-tight">Description</h3>
              <textarea
                value={description}
                onChange={handleChange}
                name="description"
                className="px-4 whitespace-pre -mt-4 resize-none h-28 py-2 border border-mediumGrey/25 bg-inherit rounded-smd outline-none leading-5.5 text-black text-mds placeholder:text-black/25 dark:placeholder:text-white/25"
              />
            </>
            {columns?.length ? (
              <ModalListTask
                setFormFields={setFormFields}
                formFields={formFields}
                hasError={hasError}
                setHasError={setHasError}
                errorOrigin={errorOrigin}
                setErrorOrigin={setErrorOrigin}
                itemPlaceholder="Enter Subtask Title"
                label="Subtasks"
                list={columns}
                setList={setColumns}
              />
            ) : null}
            <ModalButton
              onClick={handleAddCol}
              type="button"
              variant="Add"
              className="-mt-3"
            >
              + add new subtask
            </ModalButton>
            <Dropdown title="Status" setState={setStatus} />
            <ModalButton onClick={onSubmit} type="button" variant="Validate">
              create task
            </ModalButton>
          </form>
        </div>
      </dialog>
    );
  }
);

NewTaskModal.displayName = "New Task Modal";

export default NewTaskModal;
