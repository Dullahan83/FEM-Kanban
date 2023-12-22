import React from "react";
import { ITasks } from "../../Utils/Types";
import { Draggable } from "react-beautiful-dnd";
type ITaskProps = {
  taskData: ITasks;
  index: number;
} & React.ComponentPropsWithoutRef<"div">;

const Task = ({ taskData, index, ...props }: ITaskProps) => {
  const completedSubTasks = taskData.subtasks.filter(
    (sub) => sub.isCompleted === true
  );

  return (
    <Draggable draggableId={taskData.id} index={index}>
      {(provided) =>
      <div
        className="w-full group py-5.8 px-4 bg-white dark:bg-darkGrey leading-tight rounded-lg shadow-taskShadow active:animate-pulse"
        {...props}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <h4 className="mb-2 text-md">{taskData.title}</h4>
        <p className=" text-mediumGrey text-sm">{`${completedSubTasks.length} of ${taskData?.subtasks?.length} subtasks`}</p>
      </div>}
    </Draggable>
  );
};

export default Task;
