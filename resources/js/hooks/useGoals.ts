import React, { useState } from 'react'
import { Goal } from '../types';

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export const useGoalCarouselSelector = (goals:Goal[]) => {
  const [goal, setGoal] = useState<Goal | null>(goals[0])
  const [index, setIndex] = useState(0)
  const toggleObjective = () => {
    const cindex = index < (goals.length) ? index + 1 : 0
    setIndex( clamp(cindex, 0, (goals.length - 1)) )
    setGoal( goals[clamp(cindex, 0, (goals.length))] )
  }

  return {
    toggleObjective,
    goal,
    index
  }
}
