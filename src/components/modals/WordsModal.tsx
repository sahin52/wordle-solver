import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isDarkMode: boolean
  handleDarkMode: Function
  possibleWords: string[]
}

export const WordsModal = ({
  isOpen,
  handleClose,
  possibleWords,
}: Props) => {
  const shuffled = possibleWords.sort(() => 0.5 - Math.random());
  return (
    <BaseModal title="Possible Words" isOpen={isOpen} handleClose={handleClose}>
      <div className="grid-cols-2 gap-4">
        {shuffled.slice(0, 10).map((word, i) => (
          <p key={i}>{word}</p>
        ))}
      </div>
    </BaseModal>
  )
}
