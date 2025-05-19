'use client';

import { getTodoById, updateTaskById } from "@/Gateways/todo";
import { ITodo } from "@/Interfaces/todo";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

 function UpdateTask() {
  const { id } = useParams();
  const [task, setTask] = useState<ITodo | null>(null);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      const updatedTask = getTodoById(Number(id));
      if (updatedTask) {
        setTask(updatedTask);
        setTitle(updatedTask.title);
        setCompleted(updatedTask.completed);
      }
    }
  }, [id]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    if (title.trim() === "") {
      alert("Entrez une tâche");
      return;
    }
    updateTaskById(task.id, title, completed);
    router.push("/task");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8 bg-gray-50">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md sm:max-w-lg border p-6 sm:p-10 rounded-lg bg-white shadow-md flex flex-col gap-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Mettre à jour la tâche</h1>
          <button
            type="button"
            onClick={() => router.push("/task")}
            className="border bg-slate-200/80 px-4 py-1 rounded font-serif text-sm sm:text-base"
          >
            Retour
          </button>
        </div>

        <input
          className="border p-2 w-full rounded bg-white text-base"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tâche"
        />

        <select
          className="border bg-blue-100 rounded p-2 text-base"
          value={completed ? "done" : "pending"}
          onChange={(e) => setCompleted(e.target.value === "done")}
        >
          <option value="done">Terminée</option>
          <option value="pending">En cours</option>
        </select>

        <button
          type="submit"
          className="bg-green-500 text-white rounded-lg px-4 py-2 text-base font-semibold hover:bg-green-600 transition-colors"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
export default UpdateTask;