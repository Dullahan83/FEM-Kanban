import {clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {v4 as uuidv4} from 'uuid'
import { ITab } from "./Types";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
  };

export const getDatas = async () => {
  try {
    const response = await fetch("https://dullahan83.github.io/FEM-Kanban/data.json");
    const datas: {boards: ITab[]} = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch datas");
    } 
    const {boards} = datas
    return addUuidsToBoardData(boards)
  } catch (error) {
    console.log(error);
  }
};

function addUuidsToBoardData(data: ITab[]) {
  return data.map(board => ({
    ...board,
    id: uuidv4(),
    columns: board.columns.map(column => ({
      ...column,
      id: uuidv4(),
      tasks: column.tasks.map(task => ({
        ...task,
        id: uuidv4(),
        subtasks: task.subtasks.map(subtask => ({
          ...subtask,
          id: uuidv4()
        }))
      }))
    }))
  }));
}