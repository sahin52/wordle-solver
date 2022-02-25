import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isDarkMode: boolean
  handleDarkMode: Function
}

export const WordsModal = ({
  isOpen,
  handleClose,
  isDarkMode,
  handleDarkMode,
}: Props) => {
  return (
    <BaseModal title="Possible Words" isOpen={isOpen} handleClose={handleClose}>
      <div className="grid-cols-2 gap-4">
      </div>
    </BaseModal>
  )
}
