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
import { Switch } from '@headlessui/react';
type Props = {
  auth: Auth,
  goals: Goal[]
  todos: Todo
  clients: Client[]
  completed: boolean
}
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
export default function Dashboard({ auth, goals, todos, clients, completed }: Props) {
  const priorities = ['Milagro', 'Prioridad', 'Algún día', 'Delegar']
  const [selected, _] = useState(null)
  const store = useTodosIU()
  const onPageGetsFocus = () => {
    router.visit('/dashboard', { only: ['clients', 'todos'], preserveState: true })
  }
  const setSelected = (todo) => {
    store.setTodo(todo)
  }
  const handleCompleted = (ev) => {
    router.visit(route('dashboard', { completed: ev }), { preserveScroll: true })
  }
  const onSorted = (resorted: Todo[]) => {
    const data = {todos_ids:resorted.map(t => t.id)}
    fetch(route('todo.sort'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
        'Accept': 'application/json',
        'X-CSRF-TOKEN': csrfToken
      },
      body: JSON.stringify(data)
    })
    .catch(e => {
        console.log(e)
      })
    // router.post(route('todo.sort'), resorted.map(t => t.id), {preserveState: true, preserveScroll: true, only: []})
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
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-row justify-evenly gap-2">
          <ul className='flex flex-row flex-nowrap  divide-x divide-stone-200 flex-1 overflow-x-scroll'>
            {
              goals.map(g => (<li key={`goal-${g.id}`} className='px-2'>{g.name}</li>))
            }
          </ul>
          <TodoModal goals={goals} todo={store.todo} priorities={priorities} clients={clients} setSelected={setSelected} />
          <ClientModal goals={goals} priorities={priorities} />
          <Switch checked={completed} onChange={handleCompleted} className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-gray-400/10 dark:bg-gray-100 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-lime-600/20"
          ><span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
            />
          </Switch>
        </div>

        <div className='bg-white dark:bg-slate-500 my-4'>
          <div className='mx-auto max-w-7xl p-4 space-y-4'>
            <div className='space-y-1'>
              <h3 className='dark:text-orange-400 text-orange-700 font-semibold'>Milagro</h3>
              <TodosList onSorted={onSorted} todos={todos.filter(f => f.priority == 1)} setSelected={setSelected} selected={selected} />
            </div>
            <div className='space-y-1'>
              <h3 className='dark:text-lime-400 text-lime-700 font-semibold'>Prioridad</h3>
              <TodosList onSorted={onSorted} todos={todos.filter(f => f.priority == 2)} setSelected={setSelected} selected={selected} />
            </div>
            <div className='space-y-1'>
              <h3 className='text-stone-700 font-semibold'>Algún día</h3>
              <TodosList onSorted={onSorted} todos={todos.filter(f => f.priority == 3)} setSelected={setSelected} selected={selected} />
            </div>
            <div className='space-y-1'>
              <h3 className='text-gray-600 font-semibold'>Delegar</h3>
              <TodosList todos={todos.filter(f => f.priority == 4)} setSelected={setSelected} selected={selected} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
