import React from 'react'
import { Link } from '@inertiajs/react'
import { CarrotIcon } from 'lucide-react';


export default function BottomNav () {

    return (
      <div className='fixed md:hidden bottom-0 h-16 w-full bg-gray-100 border-t border-gray-200  dark:bg-gray-700 dark:border-gray-600'>
        <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <Link href={route('dashboard')} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg className='size-6 group-hover:text-blue-600' xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="1.5" color="currentColor" viewBox="0 0 24 24" > <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M18 14a2 2 0 100-4 2 2 0 000 4zM18 7a2 2 0 100-4 2 2 0 000 4zM3 5h10M3 12h10M3 19h10M16 21.243l2.121-2.122m0 0L20.243 17m-2.122 2.121L16 17m2.121 2.121l2.122 2.122" ></path> </svg>
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Home</span>
          </Link>
          <Link href={route('clients.index')} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <CarrotIcon className='size-6 group-hover:text-blue-600' />
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Clientes</span>
          </Link>
        </div>
      </div>
    )
}
