"use client";

import { ITodoItemProps } from "@/Interfaces/todo";


export default function TodoItem({ todo, onToggle, onDelete, onEdit }: ITodoItemProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <span
        onClick={() => onToggle(todo.id)}
        className={`cursor-pointer ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        Supprimer
      </button>
      <button
  onClick={() => onEdit(todo.id)}
  className="text-blue-500 hover:text-blue-700"
>
  Modifier
</button>

    </div>
  );
}
