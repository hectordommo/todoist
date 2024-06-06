// Modal para editar o crear tareas
import React, { useEffect } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import Task from '../Icons/Task'
import { useForm } from '@inertiajs/react'
import { Client, Goal, Todo } from '../../types'
import { useHotkeys } from 'react-hotkeys-hook'
import Combo from '../UI/Combobox'
import { useGoalCarouselSelector } from '../../hooks/useGoals'

type Props = {
  goals: Goal[]
  clients: Client[]
  todo: Todo | null
  priorities: string[]
}
function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function TodoModal({ goals, todo, priorities, clients }: Props) {
  const { goal, toggleObjective, index: goalIndex } = useGoalCarouselSelector(goals)
  let [isOpen, setIsOpen] = useState(false)
  const { data, setData, post, errors } = useForm({
    activity: '',
    description: '',
    goal: 0,
    effort: 1,
    goal_id: null,
    client_id: null,
    priority: 3
  })
  useHotkeys('alt + n', () => setIsOpen(true))

  useEffect(() => {
    const listener = (ev) => {
      console.log(ev)
      if(ev.type == 'todo:edit') {
        setIsOpen(true)
      }
      if(ev.type == 'client:modal:open') {
        console.log('open create clien modal')
      }
    }
    window.addEventListener('todo:edit', listener)

    return () => {
      window.removeEventListener('todo:edit', listener)
    }
  }, [])

  useEffect(() => {

    setData({
      ...data,
      goal: goalIndex,
      goal_id: goal?.id
    })
  }, [goal])
  const togglePriority = () => {
    const current = data.priority - 1
    const index = current < ( priorities.length - 1) ? current + 1 : 0
    console.log('prority', index + 1)
    setData({
      ...data,
      priority: index + 1
    })
  }

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    post(route('todo.store'))
  }

  return (
    <>
      <Button
        onClick={open}
        type='button'
        className="flex-shrink-0 w-8 h-8 rounded-full bg-black/20 p-2 font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-green-500"
        tabIndex={1}
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

                  <form onSubmit={onSubmit} className='space-y-2'>
                    <fieldset className='flex flex-row justify-center items-center space-x-1'>
                      <Task className="" />
                      <ReactTextareaAutosize name='activity' onChange={e => setData({...data, activity: e.target.value })} className='border-none border-b border-b-gray-600 p-2 w-full outline-none appearance-none focus:outline-yellow-100' placeholder='Que tienes que hacer?' data-autofocus />
                        {errors?.activity && (<p className='text-red-500 mb-4 -mt-2 self-stretch'>{errors?.activity}</p>)}
                    </fieldset>
                    <fieldset className='pl-3'>
                      <button type='button' accessKey='o' className='p-2' onClick={toggleObjective}>{ goal?.name }</button>
                      <button type='button' accessKey='o' className='p-2' onClick={togglePriority}>{ priorities[data.priority - 1] }</button>
                    </fieldset>
                    <fieldset className='pl-3 flex flew-row'>
                      <Combo clients={clients} />
                    </fieldset>
                    <div className="mt-4">
                      <Button
                        className="outline outline-white focus:outline-green-500 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </form>

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
