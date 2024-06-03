import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import type { Auth, Goal } from '../types';
import CreateGoalModal from '../Components/Todo/CreateGoalModal';
import TodoModal from '../Components/Todo/TodoModal';
type Props = {
  auth: Auth,
  goals: Goal[]
}
export default function Dashboard({ auth, goals }: Props) {
  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Head title="Dashboard" />
          <CreateGoalModal open={false} />

      <div className="py-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-row justify-evenly overflow-x-scroll">
          <ul className='flex flex-row flex-nowrap gap-3 divide-x divide-sky-500'>
            {
              goals.map(g => (<li key={`goal-${g.id}`} className='px-2 '>{g.name}</li>))
            }
          </ul>
          <TodoModal goals={goals} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
