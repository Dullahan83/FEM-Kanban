import React, { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import ModalTitle from "./ModalComponents/ModalTitle";
import MenuIcon from "../Icons/MenuIcon";
import ModalDescription from "./ModalComponents/ModalDescription";
import useStore from "../../Hooks/useStore";
import CheckboxModalItem from "./ModalComponents/CheckboxModalItem";
import Dropdown from "./ModalComponents/Dropdown";
import MenuModalTask from "./ModalComponents/MenuModalTask";
import EditTaskModal from "./EditTaskModal";


interface TaskModalProps extends ComponentPropsWithoutRef<"dialog"> {
  onClose: () => void;
  openConfirmation: () => void
}
const TaskModal = forwardRef<HTMLDialogElement, TaskModalProps>(
  ({ onClose, openConfirmation }, ref) => {
    const {manageSubtask, currentTask} = useStore()
    const taskData = useStore((store) => store.currentTask)
    const modalBody = React.useRef<HTMLDivElement>(null)
    const [openMenu, setOpenMenu] = useState(false)
    const completedSubTasks = useStore(store => store.currentTask.subtasks.filter(sub => sub.isCompleted))
    const edtitBoardModalRef = React.useRef<HTMLDialogElement>(null)
    const handleClick = (e:React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
      const target = e.target as Node

      if (!openMenu && modalBody.current && !modalBody.current.contains(target) ) {
        onClose();
      }
    }
    
    const handleOpen = () => {
      if(edtitBoardModalRef.current){
        edtitBoardModalRef.current.showModal()
        
      }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
      if(e.key === "Escape") setOpenMenu(false)
    }
    
    const handleClose = () => {
      if(edtitBoardModalRef.current){
        edtitBoardModalRef.current.close()
        onClose()
        setOpenMenu(false)
      }
    }
    


    return (
      <dialog
      id="taskModal"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
        ref={ref}
        className={
          "min-w-full fixed top-0 min-h-screen bg-black/50 text-black dark:text-white open:flex open:flex-col items-center justify-center"
        }
      >
        <div ref={modalBody} className="w-85.5 md:w-480 p-6 pb-8 md:p-8 bg-white dark:bg-darkGrey max-w-[480px] rounded-md flex flex-col gap-y-6">
            <div className="flex items-center relative w-full leading-[1.28] justify-between gap-x-4">
                <ModalTitle className="">{taskData.title}</ModalTitle>
                <MenuIcon role="button" aria-label="menu button" tabIndex={0}  className="h-fit" onClick={() => setOpenMenu(prev => !prev)}/>
               {openMenu && <MenuModalTask openConfirmation={openConfirmation} setOpenMenu={setOpenMenu} handleOpen={handleOpen} handleClose={handleClose}/>}
            </div>
            {taskData.description && <ModalDescription>{taskData.description}</ModalDescription>}
            <div className="flex flex-col gap-y-2 leading-tight">
                <h4 className=" text-mediumGrey dark:text-white text-sm mb-2" >{`Subtasks (${completedSubTasks.length} of ${taskData.subtasks.length})`}</h4>
                {taskData.subtasks.map((subtask, index) => {
                    return <CheckboxModalItem onClick={() => manageSubtask(index)} index={index} key={index} subData={subtask} />
                })}
            </div>
            <Dropdown title="current status" />
        </div>
        <EditTaskModal key={currentTask.id} ref={edtitBoardModalRef} onClose={handleClose}/>
      </dialog>
    );
  }
);

TaskModal.displayName = "Task Modal";

export default TaskModal;
