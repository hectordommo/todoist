import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import type { Auth, Client, Goal, Todo } from '../types';
import CreateGoalModal from '../Components/Todo/CreateGoalModal';
import TodoModal from '../Components/Todo/TodoModal';
import TodosList from '../Components/Todo/TodosList';
import useTodosIU from '../store/TodosUI';
import Cmdk from '../Components/Cmdk';
import ClientModal from '../Components/Client/ClientModal';
import usePageFocus from '../hooks/usePageFocus';
type Props = {
  auth: Auth,
  goals: Goal[]
  todos: Todo
  clients: Client
}
export default function Dashboard({ auth, goals, todos, clients }: Props) {
  const priorities = ['Milagro', 'Prioridad', 'Algún día', 'Delegar']
  const [selected, _] = useState(null)
  const store = useTodosIU()
  const onPageGetsFocus = () => {
    router.visit('/dashboard', {}, { only: ['clients', 'todos'] })
    console.log('window focus')
  }
  const setSelected = (todo) => {
    store.setTodo(todo)
  }
  usePageFocus(onPageGetsFocus)
  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Head title="Dashboard" />
      <CreateGoalModal open={false} />
      <Cmdk />

      <div className="pt-4 standalone:pt-12 standalone:pb-52">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-row justify-evenly overflow-x-scroll">
          <ul className='flex flex-row flex-nowrap  divide-x divide-stone-200'>
            {
              goals.map(g => (<li key={`goal-${g.id}`} className='px-2'>{g.name}</li>))
            }
          </ul>
          <TodoModal goals={goals} todo={store.todo} priorities={priorities} clients={clients} setSelected={setSelected} />
          <ClientModal goals={goals} priorities={priorities} />
        </div>

        <div className='bg-white my-4'>
          <div className='mx-auto max-w-7xl p-4 space-y-4'>
            <h3 className='text-orange-700 font-semibold'>Milagro</h3>
            <TodosList todos={todos.filter(f => f.priority == 1)} setSelected={setSelected} selected={selected} />
            <h3 className='text-lime-700 font-semibold'>Prioridad</h3>
            <TodosList todos={todos.filter(f => f.priority == 2)} setSelected={setSelected} selected={selected} />
            <h3 className='text-stone-700 font-semibold'>Algún día</h3>
            <TodosList todos={todos.filter(f => f.priority == 3)} setSelected={setSelected} selected={selected} />
            <h3 className='text-gray-600 font-semibold'>Delegar</h3>
            <TodosList todos={todos.filter(f => f.priority == 4)} setSelected={setSelected} selected={selected} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
