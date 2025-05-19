export interface ITodo {
    id: number;
    title: string;
    completed: boolean;
  }
  
  export interface ITodoItemProps {
    todo: ITodo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
  }
  
  export interface ITodoFormProps {
    onAdd: (title: string) => void;
  }