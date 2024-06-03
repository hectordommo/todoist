import { bindKey, bindKeyCombo } from '@rwh/keystrokes'
import React, { useEffect, useState } from 'react'


const useShortcuts = () => {
    const [createTodoModalOpen, setCreateTodoModalOpen ] = useState(false)

    useEffect(() => {
    }, [])

    return {
        createTodoModalOpen
    }
}
