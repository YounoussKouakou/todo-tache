"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addTodo } from "@/Gateways/todo";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Entrez la tâche");
      return;
    }

    addTodo(title);
    router.push("/task");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 flex flex-col gap-6 bg-slate-300 border border-gray-300 rounded-lg shadow-md"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/task"
            className="border bg-slate-200/80 px-4 py-2 rounded text-center"
          >
            Tâches
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            Créer une tâche
          </h1>
        </div>

        <input
          type="text"
          placeholder="Tâche"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          className="bg-white p-3 border rounded font-semibold text-base"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="cursor-pointer rounded-lg p-3 bg-green-500/20 border-2 border-green-500/20 transition-colors hover:bg-green-700/40 font-medium text-base flex items-center justify-center"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
