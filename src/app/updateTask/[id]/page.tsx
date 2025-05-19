"use client";
import { addTodo, getTodoById, updateTaskById } from "@/Gateways/todo";
import { ITodo } from "@/Interfaces/todo";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function UpdateTask() {
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
    <>
      <div className="grid justify-center items-center min-h-screen mt-10 ">
        <form
          onSubmit={handleUpdate}
          className="flex flex-col mx-auto  max-w-lg w-3xl border p-10 rounded bg-slate-100/90 gap-7"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Mettre à jour la tâche</h1>
            <button
              className="border bg-slate-200/80 px-3 flex items-center rounded font-serif cursor-pointer"
              onClick={() => router.push("/task")}>Retour
              </button>
          </div>
          <input
            className="border p-2 w-full rounded bg-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="tâche"
          />
          <div >
            <select
            className="border bg-blue-300/90 rounded p-1 font-serif text-xl"
              value={completed ? "done" : "pending"}
              onChange={(e) => setCompleted(e.target.value === "done")}
            >
              <option value="done">Terminée</option>
              <option value="pending">En cours</option>
            </select>
          </div>
          <button
            className="rounded-lg p-3 cursor-pointer bg-green-500/20 border-2 border-solid border-green-500/20 transition-colors hover:bg-green-500/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2"
            type="submit"
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </>
  );
}
