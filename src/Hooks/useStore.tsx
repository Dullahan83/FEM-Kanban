import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getDatas } from "../Utils/func";
import { immer } from "zustand/middleware/immer";
import {  ITab, ITasks } from "../Utils/Types";

interface StoreState {
  data: ITab[];
  currentBoard: ITab;
  currentTask: ITasks;
}

type Actions = {
  selectActiveBoard: (boardIndex: number) => void;
  createNewBoard: (board: ITab) => void;
  updateBoard: (board: ITab, currentName: string) => void;
  deleteBoard: (board: ITab) => void;
  selectTask: (task: ITasks) => void;
  manageSubtask: (index: number) => void;
  changeStatusByClick: (status: string) => void;
  createTask: (task: ITasks) => void;
  updateTask: (task: ITasks) => void;
  deleteTask: () => void;
  moveTask: (currColId: string, currTaskIndex: number, destColId: string, destTaskIndex: number) => void
};

// const datas: ITab[] = getDatas() as ITab[]
const initialData: ITab[] = []
const initialBoard: ITab  = {id: "", name: "", columns: []}
const initialTask: ITasks = {id: "", title: "", description:"", status: "", subtasks: []}
const useStore = create<StoreState & Actions>()(persist(
  immer((set) => ({
    data: initialData,
    currentBoard: initialBoard,
    currentTask: initialTask,
    selectActiveBoard: (boardIndex) =>
      set((state) => ({ currentBoard: state.data[boardIndex] })),
    createNewBoard: (board) =>
      set((state) => {
        state.data.push(board);
      }),
    updateBoard: (board, currentId) =>
      set((state) => {
        const index = state.data.findIndex((b) => b.id === currentId); // Utilisation de l'ID pour trouver le tableau
        if (index !== -1) {
          if (state.currentBoard.id === currentId) {
            state.data[index] = board; // Mise à jour du tableau trouvé
            state.currentBoard = board;
          }
        } else {
          // Gestion du cas où le tableau n'est pas trouvé
          console.error("Board not found for update:", board);
        }
      }),
    deleteBoard: (board) =>
      set((state) => {
        const index = state.data.findIndex((b) => b.id === board.id); // Utilisation de l'ID pour trouver le tableau
        if (index !== -1) {
          if (state.currentBoard.id === board.id) {
            state.data = state.data.filter((_, i) => i !== index);
            if (index < state.data.length) {
              state.currentBoard = state.data[index];
            } else if(state.data.length === 1){
              state.data = []
              state.currentBoard= {id: "",name: "", columns: []}
            }
            
            else state.currentBoard = state.data[0];
          }
        } else {
          // Gestion du cas où le tableau n'est pas trouvé
          console.error("Board not found for deletion:", board);
        }
      }),
    selectTask: (task) =>
      set((state) => {
        state.currentTask = task;
      }),
    manageSubtask: (index) =>
      set((state) => {
        const colIndex = state.currentBoard.columns.findIndex((col) =>
          col.tasks.some((task) => task.id === state.currentTask.id)
        );
        if (colIndex === -1) {
          console.error("Column not found");
          return;
        }

        const taskIndex = state.currentBoard.columns[colIndex].tasks.findIndex(
          (task) => task.id === state.currentTask.id
        );
        if (taskIndex === -1) {
          console.error("Task not found");
          return;
        }

        // Toggle the completion status of the subtask
        const isCompleted =
          state.currentBoard.columns[colIndex].tasks[taskIndex].subtasks[index]
            .isCompleted;
        state.currentBoard.columns[colIndex].tasks[taskIndex].subtasks[
          index
        ].isCompleted = !isCompleted;

        // Update the current task and global data state
        state.currentTask.subtasks[index].isCompleted = !isCompleted;
        const boardIndex = state.data.findIndex(
          (board) => board.id === state.currentBoard.id
        );
        if (boardIndex !== -1) {
          state.data[boardIndex].columns[colIndex].tasks[taskIndex].subtasks[
            index
          ].isCompleted = !isCompleted;
        } else {
          console.error("Board not found");
        }
      }),
    changeStatusByClick: (status) =>
      set((state) => {
        const boardIndex = state.data.findIndex(
          (board) => board.id === state.currentBoard.id
        );
        if (boardIndex === -1) {
          console.error("Board not found");
          return;
        }

        let currentColIndex = -1;
        let taskIndex = -1;

        // Trouver la colonne actuelle et l'index de la tâche
        state.currentBoard.columns.forEach((col, index) => {
          const foundIndex = col.tasks.findIndex(
            (task) => task.id === state.currentTask.id
          );
          if (foundIndex !== -1) {
            currentColIndex = index;
            taskIndex = foundIndex;
          }
        });

        if (currentColIndex === -1 || taskIndex === -1) {
          console.error("Task not found in any column");
          return;
        }

        // Trouver la nouvelle colonne basée sur le statut
        const newColIndex = state.currentBoard.columns.findIndex(
          (col) => col.name === status
        );
        if (newColIndex === -1) {
          console.error("New column not found");
          return;
        }

        // Mettre à jour le statut de la tâche et la déplacer
        const task = {
          ...state.currentBoard.columns[currentColIndex].tasks[taskIndex],
          status,
        };
        state.currentBoard.columns[currentColIndex].tasks.splice(taskIndex, 1);
        state.currentBoard.columns[newColIndex].tasks.push(task);

        // Mettre à jour le tableau global
        state.data[boardIndex] = state.currentBoard;
      }),
    createTask: (task) =>
      set((state) => {
        const column = task.status;
        const boardIndex = state.data.findIndex(
          (board) => board.id === state.currentBoard.id
        );
        if (boardIndex === -1) {
          console.error("Board not found");
          return;
        }
        const ColIndex = state.currentBoard.columns.findIndex(
          (col) => col.name === column
        );
        if (ColIndex === -1) {
          console.error("New column not found");
          return;
        }
        state.currentBoard.columns[ColIndex].tasks.push(task);
        state.data[boardIndex].columns[ColIndex].tasks.push(task);
      }),
      deleteTask: () => set((state) => {
        const indexBoard = state.data.findIndex(board => board.id === state.currentBoard.id)
        if (indexBoard === -1) {
          console.error("Board not found");
          return;
        }
        const indexCol = state.currentBoard.columns.findIndex(col => col.tasks.some(task => task.id === state.currentTask.id))
        if (indexCol === -1) {
          console.error("Column not found");
          return;
        }
        
        const indexTask = state.currentBoard.columns[indexCol].tasks.findIndex(task => task.id === state.currentTask.id)
        if (indexTask === -1) {
          console.error("Column not found");
          return;
        }
        state.currentBoard.columns[indexCol].tasks.splice(indexTask, 1)
        state.data[indexBoard].columns[indexCol].tasks.splice(indexTask,1)
        state.currentTask = {id: "", title: "", description: "", status: "", subtasks: []}
      }),
      updateTask: (task) => set((state) => {
        const indexBoard = state.data.findIndex(board => board.id === state.currentBoard.id)
        if (indexBoard === -1) {
          console.error("Board not found");
          return;
        }
        const indexCol = state.currentBoard.columns.findIndex(col => col.tasks.some(task => task.id === state.currentTask.id))
        if (indexCol === -1) {
          console.error("Column not found");
          return;
        }
        
        const indexTask = state.currentBoard.columns[indexCol].tasks.findIndex(task => task.id === state.currentTask.id)
        if (indexTask === -1) {
          console.error("Column not found");
          return;
        }
        state.currentBoard.columns[indexCol].tasks[indexTask] = task
        state.data[indexBoard].columns[indexCol].tasks[indexTask] = task
        state.currentTask = task
      }),
      moveTask: (currColId, currTaskIndex, destColId, destTaskIndex) => set((state) => {
        const indexBoard = state.data.findIndex(board => board.id === state.currentBoard.id)
        if (indexBoard === -1) {
          console.error("Board not found");
          return;
        }
        const colSrcIndex = state.currentBoard.columns.findIndex(col => col.id === currColId)
        if (colSrcIndex === -1) {
          console.error("Source Column not found");
          return;
        }
        const nextColIndex = state.currentBoard.columns.findIndex(col => col.id === destColId)
        if (colSrcIndex === -1) {
          console.error("Destination Column not found");
          return;
        }
        const task = state.currentBoard.columns[colSrcIndex].tasks[currTaskIndex]
        state.currentBoard.columns[colSrcIndex].tasks.splice(currTaskIndex, 1)
        state.currentBoard.columns[nextColIndex].tasks.splice(destTaskIndex, 0, task)
        state.data[indexBoard].columns[colSrcIndex].tasks.splice(currTaskIndex, 1)
        state.data[indexBoard].columns[nextColIndex].tasks.splice(destTaskIndex, 0, task)
      }),
  })),{
    name: 'kanbanStore', // nom unique pour le stockage local
   storage: createJSONStorage(() => sessionStorage) ,
    partialize: (state) => ({ 
      data: state.data, 
      currentBoard: state.currentBoard,
      currentTask: state.currentTask
    })
  })
);


const initializeData = async () => {
  const storedDataJson = sessionStorage.getItem('kanbanStore');
  let storedData
  if(storedDataJson){
    storedData = JSON.parse(storedDataJson)
  }
  if (!storedData.state.data.length) {
    const datas = await getDatas() as ITab[];
    useStore.setState({ data: datas, currentBoard: datas[0], currentTask: datas[0].columns[0].tasks[0] });
  }
}

initializeData()

export default useStore;
