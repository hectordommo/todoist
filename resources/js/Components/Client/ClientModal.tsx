// Modal para editar o crear tareas
import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { useForm } from '@inertiajs/react'
import { useGoalCarouselSelector } from '../../hooks/useGoals'
import { usePriorityCarouselSelector } from '../../hooks/usePriority'
import { parseColor } from '@react-spectrum/color'
import { motion, useMotionValue } from 'framer-motion'


const ClientModal = ({goals, priorities}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setDragging] = useState(false)
  const [delta, setDelta] = useState(0)
  const [hue, setHue] = useState(50)
  const [initialX, setInitialX] = useState<number |null>(null)
  const { goal, toggleObjective } = useGoalCarouselSelector(goals)
  const { priority, togglePriority } = usePriorityCarouselSelector( priorities)
  let [color, setColor] = useState(parseColor(`hsl(${hue}, 100%, 50%)`));
  const [width, setWidth] = useState(10)
  const { errors, setData, data } = useForm({
    name: '',
    priority: priority,
    color: color.toString('hex')
  })
  const handleColorChange = (e) => {
    if(isDragging) {
      if(initialX === null)
        setInitialX(e.screenX)
      if(initialX !== null) {
        let nw = Math.ceil(e.screenX) //.toString() +'px'
        setWidth(nw)
        setDelta( e.screenX - initialX)
        console.log('draggin', width)
      }

    }

  }
  const onSubmit = () => {}

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
                    Agregar cliente
                  </DialogTitle>

                  <form onSubmit={onSubmit} className='space-y-2'>
                    <fieldset className='flex flex-row justify-center items-center space-x-1'>
                      <ReactTextareaAutosize name='activity' onChange={e => setData({...data, activity: e.target.value })} className='border-none border-b border-b-gray-600 p-2 w-full outline-none appearance-none focus:outline-yellow-100' placeholder='Que tienes que hacer?' data-autofocus />
                        {errors?.activity && (<p className='text-red-500 mb-4 -mt-2 self-stretch'>{errors?.activity}</p>)}
                    </fieldset>
                    <fieldset className='pl-3 flex flex-row items-center space-x-3'>
                      <button type='button' accessKey='o' className='p-2 shadow' onClick={toggleObjective}>{ goal?.name }</button>
                      <button type='button' accessKey='o' className='p-2 shadow' onClick={togglePriority}>{ priorities[data.priority - 1] }</button>

                    <motion.div animate={{x: width}} transition={{ type: "spring" }} className='w-4 h-6 bg-gray-300 rounded'
                      onPointerMove={handleColorChange}
                      onPointerDown={() => setDragging(true)}
                      onLostPointerCapture={() => setDragging(false)}
                    >
                    </motion.div>

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

export default ClientModal;
