import React, { useState, useEffect } from 'react'
import { Todo } from '../../types'
import { cn } from '../../utils'
import { router } from '@inertiajs/react'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import TodoItem from './TodoItem'

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
type Props = {
  todos: Todo[]
  setSelected: (t: Todo) => void
  onSorted: (t: Todo[]) => void
}

const TodosList = ({ todos, setSelected, selected, onSorted }: Props) => {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
  const [items, setItems] = useState(todos)
  const [mobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))

  useEffect(() => {
    setItems(todos)
  }, [todos])

  const onEditTodo = (todo: Todo) => {
    const ev = new Event('todo:edit')
    ev.todo = todo
    dispatchEvent(ev)
  }
  const onSelect = (todo) => {
    setSelected(todo)
    if (isMobile) {
      dispatchEvent(new Event('todo:edit'));
    }
  }
  const handleCheck = (ev, todo: Todo, completed: boolean) => {
    ev.preventDefault()
    router.put(route('todo.update', todo.id), { completed: completed }, { preserveState: true, preserveScroll: true })
  }
  const sensors = useSensors(
    useSensor(PointerSensor),
  );
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        const res = arrayMove(items, oldIndex, newIndex);
        onSorted(res)
        return res
      });
    }
  }

  if (!isMobile) {

    return <DndContext sensors={sensors} onDragEnd={handleDragEnd} >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {
          items.map(todo => (
            <TodoItem draggable={true} selected={selected} key={`todo-${todo.id}`} todo={todo} onSelect={onSelect} setSelected={setSelected} handleCheck={handleCheck} />
          ))
        }
      </SortableContext>
    </DndContext >
  } else {

    return (
      <>
        <span>{todos.length}</span>
        <span>{items.length}</span>
        {
          items.map((todo, index) => (
            <TodoItem draggable={false} selected={selected} key={`todo-${todo.id}`} todo={todo} onSelect={onSelect} setSelected={setSelected} handleCheck={handleCheck} />
            )
          )
        }
      </>
    )
  }
}

export default TodosList
