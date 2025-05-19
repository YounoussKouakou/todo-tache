'use client';
import { getTodos } from '@/Gateways/todo';
import { ITodo } from '@/Interfaces/todo';
import { Span } from 'next/dist/trace';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

export default function TodoTask() {
  const [tasks, setTasks] = useState<ITodo[]>([]);

  useEffect(() => {
    setTasks(getTodos())
  }, [])
  
  return (
    <div className="grid justify-center items-center min-h-screen mt-5">
      <div className='flex flex-col w-4xl'>
      <h1 className="text-3xl font-bold text-center mb-6">Liste des Tâches</h1>
      <div className="mb-4 text-right">
        <Link
          href="/createTask"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Ajouter une tâche
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Tâche</th>
              <th className="py-3 px-6 text-left">Statut</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className={`font-serif ${task.completed ? "bg-green-50 hover:bg-green-100 ": "hover:bg-gray-300/90"}`}>
                <td className={`font-serif ${task.completed ? "line-through font-serif hover:bg-green-100 ": "hover:bg-gray-300/90"}`}>{task.title}</td>
                <td className="py-3 px-6 text-left">
                  <span className={task.completed ? ' font-serif' : 'text-yellow-600'}>
                    {task.completed ? (
                      <span>Terminée</span>
                    ) : (
                      <span>En cours ...</span>
                    )}
                  </span>
                </td>
                <td className="py-3 px-6 text-left space-x-2 flex">
                  <Link
                    href={`/updateTask/${task.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
                    title="Éditer"
                  >
                    <FaRegEdit />
                  </Link>
                  <Link
                    href={`/deleteTask/${task.id}`}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center"
                    title="Supprimer"
                  >
                    <MdDelete />
                  </Link>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">Aucune tâche disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
