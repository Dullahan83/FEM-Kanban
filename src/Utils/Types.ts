export type ITab = {
    id: string
    name: string;
    columns: IColumn[];
  };
  
  export type IColumn = {
    id: string
    name: string;
    tasks: ITasks[] ;
  };
  
  export type ITasks = {
    id: string
    title: string;
    description: string;
    status: string;
    subtasks: ISubTasks[];
  };
  
  export type ISubTasks = {
    id: string
    title: string;
    isCompleted: boolean;
  };