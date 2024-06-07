import React, { useState } from 'react'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import { ChevronDown, ChevronUp, CircleCheckBig } from 'lucide-react'
import clsx from 'clsx'
import { Client } from '../../types'


type Props = {
  clients: Client[]
}

export default function Combo({ clients, value }:Props) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filteredPeople =
    query === ''
      ? clients
      : clients.filter((person:Client) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })
    console.log('filtered', filteredPeople)

  return (
    <Combobox value={selected} onChange={(value) => setSelected(value)}>
      <div className="relative">
        <ComboboxInput
          className={clsx(
            'w-full rounded-lg border-none py-1.5 pr-8 pl-3 text-sm/6 ',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-red-300/25'
          )}
          displayValue={(person) => person?.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDown className="size-4 fill-black/60 group-data-[hover]:fill-black" />
        </ComboboxButton>
      </div>
      <Transition
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery('')}
      >
        <ComboboxOptions
          anchor="bottom"
          className="w-full rounded-xl border border-blue-500/5 bg-black/5 p-1 gap-4 empty:hidden"
        >
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/10"
            >
              <CircleCheckBig className="invisible size-4 fill-black group-data-[selected]:visible" />
              <div className="text-sm/6 ">{person.name} algo</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Transition>
    </Combobox>
  )
}

