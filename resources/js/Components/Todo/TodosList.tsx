import React, { useState, useEffect } from 'react'
import { Todo } from '../../types'
import { cn } from '../../utils'

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
      } else {
        setFocusedElement(null);
      }
    };

    // Add focus and blur event listeners
    window.addEventListener('focusin', handleFocus);
    window.addEventListener('focusout', handleFocus);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('focusin', handleFocus);
      window.removeEventListener('focusout', handleFocus);
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

  return (
    <>
    {
      todos.map((todo, index) => (
        <article onClick={()=> onSelect(todo)} data-todo={todo} key={`t-${todo.id}`}
            className={
              cn('px-1 py-2',"todo-focusable flex flex-row rounded border-b outline outline-white focus:outline-yellow-300 transform transition-transform duration-300 hover:-translate-y-1 cursor-pointer",
                {'outline-amber-700': selected?.id == todo.id} )
            }
            tabIndex={0}>
          <span className='flex-1'>{todo.activity}</span>
          <span className='text-sm p-1 rounded-lg'>#{todo.goal?.name}</span>
          <span className='w-4 text-xs bg-stone-200 text-stone-500 px-1 rounded flex items-center'>{todo.priority}</span>
        </article>))
    }
    </>
  )
}

export default TodosList
