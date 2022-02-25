import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { Appearance } from '../../App'
import { useState } from 'react'

type Props = {
  value?: string
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
  row?: number
  setCurrentAppearances?: (i: number, j: number, appearance: Appearance)=> void
  keyy?: number
  status?: CharStatus
}

export const Cell = ({
  value,
  isRevealing,
  isCompleted,
  position = 0,
  row,
  setCurrentAppearances,
  keyy, 
  status
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()
  const [currentColor,setCurrentColor] = useState<Appearance>('gray')

  let currentClassnames= {
    'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600': !status,
    'border-black dark:border-slate-100': value && !status,
    'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700': currentColor === 'gray',
    'correct shadowed bg-orange-500 text-white border-orange-500': currentColor === 'green' && isHighContrast,
    'present shadowed bg-cyan-500 text-white border-cyan-500': currentColor === 'yellow' && isHighContrast,
    'correct shadowed bg-green-500 text-white border-green-500': currentColor === 'green' && !isHighContrast,
    'present shadowed bg-yellow-500 text-white border-yellow-500': currentColor === 'yellow' && !isHighContrast,
    'cell-fill-animation': isFilled,
    'cell-reveal': shouldReveal,
  }
  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    currentClassnames
  )
  function getNextColor(a:Appearance):Appearance{
    if(a==='gray') return 'yellow';
    if(a==='yellow') return 'green';
    if(a==='green') return 'gray';
    return 'gray'
  }

  return (
    <div
      className={classes}
      onClick={() => {
        if(setCurrentAppearances){
          console.log("row")
          setCurrentAppearances(row!,keyy!,getNextColor(currentColor));
          setCurrentColor(getNextColor(currentColor));
        }
        console.log('your moms')
      }}
      style={{ animationDelay }}
    >
      <div
        className="letter-container"
        onClick={() => {
          console.log('your mom')
        }}
        style={{ animationDelay }}
      >
        {value}
      </div>
    </div>
  )
}
