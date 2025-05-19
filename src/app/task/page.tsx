'use client';
import { getTodos } from '@/Gateways/todo';
import { ITodo } from '@/Interfaces/todo';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export default function TodoTask() {
  const [tasks, setTasks] = useState<ITodo[]>([]);

  useEffect(() => {
    setTasks(getTodos());
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Liste des Tâches
        </h1>

        <div className="mb-4 text-right">
          <Link
            href="/createTask"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base"
          >
            Ajouter une tâche
          </Link>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto border text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
                <th className="py-3 px-4 sm:px-6 text-left">Tâche</th>
                <th className="py-3 px-4 sm:px-6 text-left">Statut</th>
                <th className="py-3 px-4 sm:px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className={`font-serif border-b ${
                    task.completed
                      ? 'bg-green-50 hover:bg-green-100'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <td
                    className={`py-3 px-4 sm:px-6 ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                  </td>
                  <td className="py-3 px-4 sm:px-6">
                    <span className={task.completed ? '' : 'text-yellow-600'}>
                      {task.completed ? 'Terminée' : 'En cours ...'}
                    </span>
                  </td>
                  <td className="py-3 px-4 sm:px-6">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/updateTask/${task.id}`}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center justify-center text-sm"
                        title="Éditer"
                      >
                        <FaRegEdit />
                      </Link>
                      <Link
                        href={`/deleteTask/${task.id}`}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center justify-center text-sm"
                        title="Supprimer"
                      >
                        <MdDelete />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-4 text-gray-500 text-sm"
                  >
                    Aucune tâche disponible.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}