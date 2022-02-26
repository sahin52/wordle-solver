import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Write the word and click on the squares to change their color.
      </p>

      <div className='pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8'>
        <img className='content-center' src="./howtouse.gif" alt="how to use"></img>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        And Hit Enter!
      </p>
      <div className='pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8'>
        <img className='content-center' src="./clickonenter.gif" alt="how to use"></img>
      </div>
      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This project is developed by Kasap, with the help of other open source projects on Github -{' '}
        <a
          href="https://github.com/sahin52/wordle-solver"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
