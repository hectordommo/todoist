import React from 'react'
import { cn } from '../../utils'
import { ClassValue } from 'clsx'



const Icon = ({ className }: React.ReactElement<HTMLOrSVGElement> & { className: string | ClassValue | undefined }) => {
  return (
    <svg className={cn("size-4", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>

  )

}


export default Icon
