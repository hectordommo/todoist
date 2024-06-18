import React from "react"
import Checkbox from '../Checkbox'
import type { Todo } from "../../types"
import { cn } from "../../utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';

type Props = {
  onSelect: (todo: Todo) => void
  setSelected: (todo: Todo) => void
  handleCheck: (todo: Todo) => void
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

  console.log(todo.id)
  return (
      <Wrapper
        todo={todo}
        selected={selected}
        onSelect={onSelect}
        setSelected={setSelected}
        draggable={draggable}
        className={
          cn('px-1 py-2', "z-0 todo-focusable flex flex-row bg-white dark:bg-gray-600 items-center gap-2 border-b dark:outline-slate-500 focus:outline-yellow-300 cursor-pointer",
            )
        }
        tabIndex={0}>
        <Checkbox onChange={(ev) => handleCheck(ev, todo, !todo.completed)} checked={todo.completed} />
        <p className='flex-1 flex flex-row items-center space-x-2'>
        {todo.id}
          <span className='h-1 w-1 ml-2 bg-gray-300 rounded-full flex-shrink-0 inline-block' style={{ backgroundColor: todo.client_id ? todo.client.color : '#f5f5f5' }}></span>
          <span className=''>{todo.activity}</span></p>
        <div>
          <span className='text-sm p-1 rounded-lg'>#{todo.goal?.name}</span>
          <span className='text-sm p-1 rounded-lg'>{todo.client?.name}</span>
        </div>
        <span className='w-4 text-xs bg-stone-200 text-stone-500 px-1 rounded flex items-center'>{todo.value}</span>
      </Wrapper>
  )
}

export default TodoItem
