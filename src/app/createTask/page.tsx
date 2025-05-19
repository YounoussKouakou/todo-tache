"use client";
import {  useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addTodo } from "@/Gateways/todo";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() == "") {
      setError("Entrez la tâches");
    }

    addTodo(title);
    router.push("/task");
  };

  return (
    <div className="grid justify-center items-center h-screen mt-10 p-10  bg-white">
      <form
        onSubmit={handleSubmit}
        className="h-96 w-2xl p-5 justify-center flex flex-col mx-auto gap-10 bg-slate-300 max-w-lg border-2 border-solid  border-gray-300 rounded-lg shadow-md"
      >
        <div className="w-full flex justify-between ">
          <Link
            href="/task"
            className="border bg-slate-200/80 px-3 flex items-center rounded"
          >
            Taches
          </Link>
          <h1 className=" text-center text-3xl font-bold">Créer une tâche</h1>
        </div>

        <input
          type="text"
          placeholder="Tâche"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          className="bg-white p-2 border rounded font-semibold text-lg"
          required
        />

        <button
          type="submit"
          className="cursor-pointer rounded-lg p-3 bg-green-500/20 border-2 border-solid border-green-500/20 transition-colors hover:bg-green-700/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
