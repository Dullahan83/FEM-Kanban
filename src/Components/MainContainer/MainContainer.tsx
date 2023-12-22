import React, { useState } from "react";
import Column from "./Column";
import { cn } from "../../Utils/func";
import useStore from "../../Hooks/useStore";
import Button from "../Shared/Button";
import EditBoardModal from "../Modals/EditBoardModal";
import TaskModal from "../Modals/TaskModal";
import { ITasks } from "../../Utils/Types";
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

const pelletColor = [
  "#49C4E5",
  "#8471F2",
  "#67E2AE",
  "#e2b767",
  "#e26767",
  "#402bff",
  "#edff2b",
];



const MainContainer = ({handleOpenConfirm}: {handleOpenConfirm: () => void}) => {
  const {currentBoard, selectTask, currentTask, moveTask} = useStore()
  // const [editedTask, setEditedTask] = React.useState<ITasks>(currentBoard?.columns[0]?.tasks[0])
  const editBoardModalRef = React.useRef<HTMLDialogElement | null>(null)
  const taskModalRef = React.useRef<HTMLDialogElement>(null)
  

  const [maxColHeigth, setMaxColHeight] = useState(0);


  const handleOpen = () => {    
    editBoardModalRef.current?.showModal()
  }

  const handleClose = () => {
    if(editBoardModalRef.current){
      editBoardModalRef.current?.close()
    }
  }

  const handleOpenTaskModal = (task: ITasks) => {
    selectTask(task)
    const timer = setTimeout(() => taskModalRef.current?.showModal(),100)
    return () => clearTimeout(timer)
  }




  const onDragEnd = (result: DropResult) => {
    const {destination, source} = result
    if(!destination) return
    if(destination.droppableId === source.droppableId && destination.index === source.index) return
    moveTask(source.droppableId, source.index, destination.droppableId, destination.index)
  }
  

  
  return (
    <div
      className={cn(
        "flex-1 w-full relative overflow-scroll no-scrollbar bg-bgLight  dark:bg-bgDark flex  pl-6 pr-56 pt-6  ",
        {
          "h-full items-center justify-center px-6":
            currentBoard?.columns.length === 0,
            "pr-6": !currentBoard
        }
      )}
    >
      {currentBoard?.columns?.length ? (
      <DragDropContext key={"dragContext"} onDragEnd={onDragEnd}>
        <div className="flex gap-x-6 h-fit">
          {currentBoard?.columns.map((col, index) => {
            return (
              <Column
                id={col.id}
                colData={col}
                key={index}
                pelletColor={pelletColor[index]}
                setMaxColHeight={setMaxColHeight}
                maxColHeight={maxColHeigth}
                handleOpenTaskModal={handleOpenTaskModal}
              />
            );
          })}
          <Button
            style={{ height: maxColHeigth }}
            className=" w-70 bg-gradient-to-b from-newCol to-[#eaf0fa80] dark:from-darkGrey/25 dark:to-darkGrey/10 capitalize text-mediumGrey hover:text-primary text-xl rounded-lg mt-10.5 "
            onClick={handleOpen}
          >
            + new column
          </Button>
        </div>
        </DragDropContext>
      ) : (
        <div className=" flex flex-col justify-center items-center gap-y-8 w-full h-full">
          <p className="text-mediumGrey text-center w-4/5 lg:w-full leading-5.8">
            This board is empty. Create a new column to get started.
          </p>
          <Button
            variant="Base"
            disabled={currentBoard?.columns.length !== 0 ? true : false}
            className="pl-4.5 pr-4.5"
            onClick={handleOpen}
          >
            + add new column
          </Button>
        </div>
      )}
      <EditBoardModal key={"edit" + currentBoard?.id} ref={editBoardModalRef} onClose={handleClose}/>
      <TaskModal openConfirmation={handleOpenConfirm} key={currentTask.title} ref={taskModalRef} onClose={() => taskModalRef.current?.close()} />

    </div>
  );
};

export default MainContainer;
