import { create } from 'zustand'
import { Todo } from '../types'


type Store  = {
    todo: Todo | null
    setTodo: (todo : Todo) => void
}

const useTodosIU = create<Store>( set => ({
    todo: null,
    setTodo: (todo) => set((_) => ({todo: todo}))
}))

export default useTodosIU
