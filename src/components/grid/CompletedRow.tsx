import { Appearance } from '../../App'
import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  isRevealing?: boolean
  keyy: number
  setCurrentAppearances: (i: number, j: number, appearance: Appearance) => void
}

export const CompletedRow = ({
  guess,
  isRevealing,
  keyy,
  setCurrentAppearances,
}: Props) => {
  const statuses = getGuessStatuses(guess)
  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          keyy={i}
          row={keyy}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
          setCurrentAppearances={setCurrentAppearances}
        />
      ))}
    </div>
  )
}
