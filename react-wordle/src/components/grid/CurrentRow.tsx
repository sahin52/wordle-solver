import { Appearance } from '../../App'
import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'

type Props = {
  guess: string
  className: string
  setCurrentAppearances: (i: number, j: number, appearance: Appearance)=> void
  row: number
}

export const CurrentRow = ({ guess, className, row, setCurrentAppearances}: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`
console.log("CurrentRoww")
console.log(splitGuess);
  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => {
        console.log("i")
        console.log(i)
        return(
        <Cell keyy={i} key={i} value={letter} row={row} setCurrentAppearances={setCurrentAppearances}/>
      )})}
      {emptyCells.map((_, i) => (
        <Cell keyy={i} key={i} row={row} setCurrentAppearances={setCurrentAppearances}/>
      ))}
    </div>
  )
}
