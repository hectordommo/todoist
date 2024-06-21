import React from "react"
import Checkbox from '../Checkbox'
import type { Todo } from "../../types"
import { cn } from "../../utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';

type Props = {
  onSelect: (todo: Todo) => void
  setSelected: (todo: Todo) => void
  handleCheck: (ev, todo: Todo, completed: boolean) => void
  todo: Todo
  selected: Todo
  draggable: boolean
}
const Wrapper = ({className, draggable, todo, tabIndex, children, onSelect, setSelected, selected}) => {

  if(! todo.id) debugger
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    active
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if(draggable) {
    return (
      <article className={cn( className, { 'outline-amber-700': selected?.id == todo.id, 'z-10': active ? (active.id == todo.id) : false } )}
        ref={setNodeRef}
        style={style} {...attributes} {...listeners} onClick={() => onSelect(todo)}
        data-todo={todo} key={`t-${todo.id}`}
        onFocus={() => setSelected(todo)} tabIndex={tabIndex}>
      {children}
      </article>
    )
  }else {

      return <article className={className} onClick={() => onSelect(todo)} data-todo={todo} key={`t-${todo.id}`} onFocus={() => setSelected(todo)} tabIndex={tabIndex}>
      {children}
      </article>
  }
}
const TodoItem = ({ todo, selected, onSelect, setSelected, handleCheck, draggable }: Props) => {

  return (
    <Wrapper
      todo={todo}
      selected={selected}
      onSelect={onSelect}
      setSelected={setSelected}
      draggable={draggable}
      className={
        cn('px-1 py-2', "z-0 todo-focusable flex flex-col md:flex-row md:items-center md:justify-between bg-white dark:bg-gray-600  gap-2 border-b dark:outline-slate-500 focus:outline-yellow-300 cursor-pointer",
        )
      }
      tabIndex={0}>
      <div className="flex flex-row space-x-1">
        <Checkbox onChange={(ev) => handleCheck(ev, todo, !todo.completed)} checked={todo.completed} />
        <div className="flex items-start md:items-center pt-2 md:pt-0">
          <span className='h-2 w-2 bg-gray-300 rounded-full flex-shrink-0 inline-block' style={{ backgroundColor: todo.client_id ? todo.client.color : '#f5f5f5' }}></span>
        </div>
        <p className='flex-1 flex flex-row items-center space-x-2 justify-start'>
          <span className=''>{todo.activity}</span>

        </p>
      </div>
      <div className="flex flex-row space-x-2 text-sm md:text-base">
        <span className='p-1 rounded-lg text-stone-400'>#{todo.goal?.name}</span>
        <span className='p-1 rounded-lg'>{todo.client?.name}</span>
        <span className=' text-xs bg-stone-200 text-stone-500 px-1 py-0 rounded pt-1'>{todo.value}</span>
      </div>
    </Wrapper>
  )
}

export default TodoItem
