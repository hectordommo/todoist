import React, { useState } from 'react'

export const usePriorityCarouselSelector = (priorities: string[]) => {
  const [ priority, setPriority] = useState(3)

  const togglePriority = () => {
    const current = priority - 1
    const index = current < ( priorities.length - 1) ? current + 1 : 0
    console.log('prority', index + 1)
    setPriority(index + 1)
  }


  return {
    priority,
    togglePriority
  }
}

