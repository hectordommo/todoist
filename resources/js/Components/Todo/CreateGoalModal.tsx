import React, { ChangeEvent, useEffect } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { useForm } from '@inertiajs/react'

type Props = {
    open:  boolean

}
function CreateGoalModal(props:Props) {
  // The open/closed state lives outside of the `Dialog` and is managed by you
  let [isOpen, setIsOpen] = useState(props.open)
  useEffect(() => {
    const handler = () =>setIsOpen(true)
    window.addEventListener('goal:modal:open', handler)

    return () => {
      window.removeEventListener('goal:modal:open', handler)
    }
  }, [])
  const { data, setData, post } = useForm({
    name: '',
    priority: 2
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await post( route('goals.store'))
    setIsOpen(false)

  }

  return (
    /*
      Pass `isOpen` to the `open` prop, and use `onClose` to set
      the state back to `false` when the user clicks outside of
      the dialog or presses the escape key.
    */
    <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}
      className={'relative z-10 focus:outline-none'}>
      <div className="fixed inset-0 bg-black/30 w-full min-h-full" aria-hidden="true" />

      <div className='fixed top-0 inset-0 z-10 w-screen overflow-y-auto'>

        <div className='flex min-h-full w-full items-center justify-center'>
          <DialogPanel as="div" className="w-11/12 mx-auto bg-white rounded-lg p-5 max-w-5xl rounded-ui bg-red-200 p-6 backdrop-blur-2xl">
            <DialogTitle>Crear nueva tarea</DialogTitle>
            <Description>Agrega una nueva meta para tu vida.</Description>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <fieldset>
              <input value={data.name} onChange={(e:InputEvent) => setData({...data,'name': e.target.value})} className='bg-white border rounded border-gray-100 w-full' placeholder='Nombre' data-autofocus />
              </fieldset>

              <div className='flex justify-end'>
                <button type="button"  className="btn" onClick={() => setIsOpen(false)}>Cerrar</button>
                <button type="submit" className='btn primary'>Crear</button>
              </div>

            </form>

          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}


export default CreateGoalModal
