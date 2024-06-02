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
export default function Dashboard({ auth, goals }:Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <CreateGoalModal open={false} />
            <TodoModal />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ul className='py-8 flex flex-row flex-nowrap gap-3 '>
                        {
                            goals.map(g => (<li key={`goal-${g.id}`}>{g.name}</li>))
                        }
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
