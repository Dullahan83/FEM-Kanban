import React from "react";
import Task from "./Task";
import useStore from "../../Hooks/useStore";
import { IColumn, ITasks } from "../../Utils/Types";
import { Droppable } from "react-beautiful-dnd";
type IColProps = {
  colData: IColumn;
  pelletColor: string;
  setMaxColHeight: React.Dispatch<React.SetStateAction<number>>;
  maxColHeight: number;
  handleOpenTaskModal: (task: ITasks) => void;
} & React.ComponentPropsWithoutRef<"div">;

const Column = ({
  colData,
  pelletColor,
  setMaxColHeight,
  maxColHeight,
  handleOpenTaskModal,
  ...props
}: IColProps) => {
  const colRef = React.useRef<HTMLDivElement>(null);
  const minHeight = (window.innerHeight / 100) * 74.2;
  const { currentBoard, currentTask } = useStore();
  React.useEffect(() => {
    if (colRef.current) {
      if (colRef.current.clientHeight > maxColHeight)
        setMaxColHeight(colRef.current.clientHeight);
      if (colRef.current.clientHeight < minHeight) setMaxColHeight(minHeight);
    }
  }, [currentBoard.name, currentTask.id]);

  return (
    <div className=" w-70 h-full min-h-full pb-10" {...props}>
      <h3 className="uppercase tracking-ginormous flex items-center mb-6">
        <div
          className="w-4 aspect-square rounded-full mr-3 "
          style={{ backgroundColor: pelletColor }}
        ></div>
        {`${colData?.name} (${colData?.tasks.length})`}
      </h3>
      <div className="w-full h-full min-h-full" ref={colRef}>
        <Droppable droppableId={colData.id}>
          {(provided) => (
            <div
              className="w-full min-h-full pb-14 flex flex-col gap-5"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {colData?.tasks.map((task, index) => {
                return (
                  <Task
                    index={index}
                    key={task.id}
                    taskData={task}
                    onClick={() => handleOpenTaskModal(task)}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
