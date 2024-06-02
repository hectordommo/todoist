import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import type { Auth } from '../types';
import CreateGoalModal from '../Components/Todo/CreateGoalModal';
type Props = {
    auth: Auth
}
export default function Dashboard({ auth }:Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <CreateGoalModal />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
