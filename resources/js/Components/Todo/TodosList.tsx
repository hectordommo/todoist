import React, { useState, useEffect } from 'react'
import { Todo } from '../../types'

type Props = {
  todos: Todo[]
}

const TodosList = ({ todos }: Props) => {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleFocus = (event) => {
      // Check if the focused element is one you want to deal with
      if (event.target.matches('.todo-focusable')) {
        setFocusedElement(event.target.dataset.todo);
        console.log(event.target)
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

  return (
    <>
    {
      todos.map((todo, index) => (
        <article onClick={()=> onEditTodo(todo)} data-todo={todo} key={`t-${todo.id}`} className="todo-focusable flex flex-row rounded border-b outline outline-white focus:outline-yellow-300 transform transition-transform duration-300 hover:-translate-y-1 cursor-pointer" tabIndex={0}>
          <span className='flex-1'>{todo.activity}</span>
          <span className='text-sm p-1 rounded-lg'>#{todo.goal.name}</span>
          <span className='w-4 text-xs bg-stone-200 text-stone-500 px-1 rounded flex items-center'>{todo.priority}</span>
        </article>))
    }
    </>
  )
}

export default TodosList
