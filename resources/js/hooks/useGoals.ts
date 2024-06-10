import React, { useEffect, useState } from 'react'
import { Goal } from '../types';

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export const useGoalCarouselSelector = (goals:Goal[], goal_id = null) => {
  const [goal, setGoal] = useState<Goal | null>(goals[0])
  const [index, setIndex] = useState(0)

  const toggleObjective = () => {
    const cindex = index < (goals.length) ? index + 1 : 0
    setIndex( clamp(cindex, 0, (goals.length - 1)) )
    setGoal( goals[clamp(cindex, 0, (goals.length))] )
  }
  useEffect(() => {
    if(goal_id) {
      console.log('set goal id', goal_id)
      console.log('set goal index',  goals.findIndex(g => g.id == goal_id))
      setGoal( goals.find(g => g.id == goal_id))
      let g = goals[ goals.findIndex(g => g.id == goal_id)]
      console.log('found goal', goals.find(g => g.id == goal_id))

      setIndex( goals.findIndex(g => g.id == goal_id))
    }
  }, [goal_id])

  return {
    toggleObjective,
    setGoal,
    goal,
    index
  }
}
