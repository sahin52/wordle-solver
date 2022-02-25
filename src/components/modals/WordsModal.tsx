import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

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
  isDarkMode,
  handleDarkMode,
  possibleWords,
}: Props) => {
  return (
    <BaseModal title="Possible Words" isOpen={isOpen} handleClose={handleClose}>
      <div className="grid-cols-2 gap-4">
        {possibleWords.slice(0, 10).map((word, i) => (
          <p key={i}>{word}</p>
        ))}
      </div>
    </BaseModal>
  )
}
