// Modal para editar o crear tareas
import React, { useEffect } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import Task from '../Icons/Task'
import { useForm } from '@inertiajs/react'
import { Goal } from '../../types'
import { useHotkeys } from 'react-hotkeys-hook'

type Props = {
  goals: Goal[]
}
function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function TodoModal({ goals }: Props) {
  const [goal, setGoal] = useState<Goal>(goals[0])
  let [isOpen, setIsOpen] = useState(false)
  const { data, setData, post } = useForm({
    activity: '',
    goal: 0
  })
  useHotkeys('alt + n', () => setIsOpen(true))


  const toggleObjective = () => {
    // todo: loop throw the collection of goals
    const index = data.goal + 1
    setGoal(goals[clamp(index, 0, (goals.length - 1))])
    setData({
      ...data,
      goal: (index <= goals.length) ? index : 0
    })
  }

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={open}
        type='button'
        className="flex-shrink-0 w-8 h-8 rounded-full bg-black/20 p-2 font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </Button>

      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close} >

          <div className="fixed inset-0 bg-black/30 z-0 backdrop-blur-md" aria-hidden="true" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="z-20 w-11/12 sm:1/2 rounded-xl bg-white text-black p-6 ">
                  <DialogTitle as="h3" className="text-base/7 font-medium ">
                    Agregar nueva actividad
                  </DialogTitle>

                  <form>
                    <fieldset className='flex flex-row justify-center items-center space-x-1'>
                      <Task className="" />
                      <ReactTextareaAutosize className='border-none border-b border-b-gray-600 p-2 w-full outline-none appearance-none focus:outline-yellow-100' placeholder='Que tienes que hacer?' data-autofocus />
                    </fieldset>
                    <fieldset className='pl-3'>
                      <button type='button' accessKey='o' className='p-2' onClick={toggleObjective}>{goal.name}</button>
                    </fieldset>
                  </form>

                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={close}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default TodoModal
