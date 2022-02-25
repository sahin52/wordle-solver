import { Appearance } from '../../App'
import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
  currentRowClassName: string
  setCurrentAppearances: (i: number, j: number, appearance: Appearance)=> void
}

export const Grid = ({
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
  setCurrentAppearances,
}: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          keyy={i}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
          setCurrentAppearances={setCurrentAppearances}
        />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow
          row={guesses.length}
          guess={currentGuess}
          className={currentRowClassName}
          setCurrentAppearances={setCurrentAppearances}
        />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
