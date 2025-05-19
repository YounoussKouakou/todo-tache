"use client";

import { ITodoFormProps } from "@/Interfaces/todo";
import { useState } from "react";

export default function TodoForm({ onAdd }: ITodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== "") {
      onAdd(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche"
        className="border p-2 flex-grow"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Ajouter
      </button>
    </form>
  );
}