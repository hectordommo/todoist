import { Head } from "@inertiajs/react";
import BottomNav from "../../Components/UI/BottomNav";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import type { Auth, Client } from "../../types";

type Props =  {
  auth: Auth,
  clients: Client[]
}

export default function Index( {auth, clients}:Props) {

  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Head title="Clientes" />
      <div className="pt-4 standalone:pt-12 standalone:pb-52">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 gap-2">
<div  className="p-4 space-y-3">
          {
            clients.map((c:Client) => <div key={`client-${c.id}`} className="flex flex-row justify-between">{c.name} <button className=''>D</button></div>)
          }
          </div>
        </div>
      </div>
      <BottomNav />
    </AuthenticatedLayout>

    )
}
