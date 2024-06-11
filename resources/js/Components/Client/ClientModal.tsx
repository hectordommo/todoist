// Modal para editar o crear tareas
import React, { useEffect, useRef, useState } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { useForm } from '@inertiajs/react'
import { useGoalCarouselSelector } from '../../hooks/useGoals'
import { usePriorityCarouselSelector } from '../../hooks/usePriority'
import { parseColor } from '@react-spectrum/color'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { UserPlusIcon } from 'lucide-react'

const getGradient = (saturation, lightness) => {
  let items = []
  for(let i = 1; i <= 36; i++) {
    let gradient = Math.ceil(((i * 10) * 100) / 360)
    let string = ` hsl(${(i * 10)}, ${lightness}%, ${saturation}%) ${gradient}%`
    items.push(string)
  }
  return '90deg, ' + items.join(',');
}

const ClientModal = ({goals, priorities}) => {
  const colorPickerHolder = useRef(null)
  const handleRef = useRef<HTMLDivElement>()
  const progressBarRef = useRef<HTMLDivElement>()
  const handleSize = 3 * 16;
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setDragging] = useState(false)
  const [delta, setDelta] = useState(0)
  const [hue, setHue] = useState(50)
  const [initialX, setInitialX] = useState<number |null>(null)
  const { goal, toggleObjective } = useGoalCarouselSelector(goals)
  const { priority, togglePriority } = usePriorityCarouselSelector( priorities)
  let [color, setColor] = useState(parseColor(`hsl(${hue}, 100%, 50%)`));
  let [background, setBackground] = useState(getGradient(100,50))
  const [width, setWidth] = useState('100%')
  const x = useMotionValue(0)
  console.log(background)

  const { errors, setData, data, post } = useForm({
    name: '',
    priority: priority,
    color: color.toString('hex')
  })
  useEffect(() => {
    const handler = () =>setIsOpen(true)
    window.addEventListener('client:modal:open', handler)

    return () => {
      window.removeEventListener('client:modal:open', handler)
    }
  }, [])
  useEffect(() => {
    setColor(parseColor(`hsl(${hue}, 100%, 50%)`))
    setData({...data, color: color.toString('hex')})
  }, [hue])
  useEffect(() => {
    setData({
      ...data,
      priority: priority
    })
  }, [priority])

  const handleColorChange = (e) => {
    if(isDragging) {
      if(initialX === null)
        setInitialX(e.screenX)

      if(initialX !== null) {
        let { right } = e.currentTarget.getBoundingClientRect()
        let overflow = right - e.clientX
        console.log('ov',right, e.clientX, overflow)
        x.set(overflow)
        console.log('draggin', ((300 + overflow) / 300))
      }
    }
  }
  const handleDrag = () => {
    if(handleRef.current && progressBarRef.current) {
      const handleBounds = handleRef.current?.getBoundingClientRect()
      const middleOfHandle = handleBounds?.x + handleBounds?.width / 2
      const progressBarBounds = progressBarRef.current.getBoundingClientRect()
      const newProgress = (middleOfHandle - progressBarBounds.x) / progressBarBounds.width
      setHue( newProgress * (250 - 1));
      console.log(newProgress)
    }
  }
  const onSubmit = async (ev) => {
    ev.preventDefault()
    await post(route('client.store'))
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        type='button'
        className="flex-shrink-0 w-8 h-8 rounded-full bg-black/20 p-2 font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-green-500"
        tabIndex={1}
      >
        <UserPlusIcon className='w-4 h-4' />
      </Button>

      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)} >

          <div className="fixed inset-0 bg-black/30 z-0 backdrop-blur-md" aria-hidden="true" onClick={() => setIsOpen(false)} />

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
                    Información de tu cliente
                  </DialogTitle>

                  <form onSubmit={onSubmit} className='space-y-2'>
                    <fieldset className='flex flex-row justify-center items-center space-x-1'>
                      <ReactTextareaAutosize name='name' onChange={e => setData({...data, name: e.target.value })}
                        className='border-none border-b border-b-gray-600 p-2 w-full outline-none appearance-none focus:outline-yellow-100' placeholder='Nombre del cliente'
                        data-autofocus />
                        {errors?.name && (<p className='text-red-500 mb-4 -mt-2 self-stretch'>{errors?.name}</p>)}
                    </fieldset>
                    <fieldset className='pl-3 flex flex-row items-center space-x-3'>
                      <button type='button' accessKey='i' className='p-2 shadow' onClick={togglePriority}>{ data.priority }</button>

                    <motion.div style={{width: '100%', background: `linear-gradient(${background}) `
                      }} transition={{ type: "easeOut" }} className='w-4 h-6 bg-gray-300 rounded relative'
                        tabIndex={0}
                    >
                        <div ref={progressBarRef} className='absolute h-1 bg-blue-300' style={{left: handleSize / 2, right: handleSize / 2}} data-name="slider-progress"/>
                        <div ref={colorPickerHolder}>
                          <motion.div ref={handleRef} style={{left: handleSize / 2, width: handleSize, backgroundColor: color}} className='w-10 h-6 border border-white relative' dragElastic={0} onDrag={handleDrag} drag="x" dragConstraints={colorPickerHolder}></motion.div>
                        </div>
                    </motion.div>

                    </fieldset>

                    <div className="mt-8 flex justify-end">
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
