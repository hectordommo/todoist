import React, { useState, useEffect } from 'react'
import { Todo } from '../../types'
import { cn } from '../../utils'
import Checkbox from '../Checkbox'
import { router } from '@inertiajs/react'

type Props = {
  todos: Todo[]
  setSelected: (t:Todo) => void
}

const TodosList = ({ todos, setSelected, selected }: Props) => {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleFocus = (event) => {
      // Check if the focused element is one you want to deal with
      if (event.target.matches('.todo-focusable')) {
        setFocusedElement(event.target.dataset.todo);
        setSelected(event.target.dataset.todo)
      }
    };

    // window.addEventListener('focusin', handleFocus);
    // window.addEventListener('focusout', handleFocus);

    return () => {
      // window.removeEventListener('focusin', handleFocus);
      // window.removeEventListener('focusout', handleFocus);
    };
  }, [])
  const onEditTodo = (todo:Todo) => {
    const ev = new Event('todo:edit')
    ev.todo = todo
    dispatchEvent(ev)
  }
  const onSelect = (todo) => {
    setSelected(todo)
  }
  const handleCheck = ( todo:Todo, completed:boolean) => {
    router.put(route('todo.update', todo.id), {completed: completed}, {preserveState: true, preserveScroll: true})
  }

  return (
    <>
    {
      todos.map((todo, index) => (
        <article onClick={()=> onSelect(todo)} data-todo={todo} key={`t-${todo.id}`} onFocus={() => setSelected( todo)}
            className={
              cn('px-1 py-2',"todo-focusable flex flex-row items-center gap-3 rounded border-b outline outline-white focus:outline-yellow-300 transform transition-transform duration-300 hover:-translate-y-1 cursor-pointer",
                {'outline-amber-700': selected?.id == todo.id} )
            }
            tabIndex={0}>
            <Checkbox onChange={()=> handleCheck(todo, !todo.completed)} checked={todo.completed} />
          <span className='flex-1'>{todo.activity}</span>
          <span className='text-sm p-1 rounded-lg'>#{todo.goal?.name}</span>
          <span className='w-4 text-xs bg-stone-200 text-stone-500 px-1 rounded flex items-center'>{todo.value}</span>
        </article>))
    }
    </>
  )
}

export default TodosList
