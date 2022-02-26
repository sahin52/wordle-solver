import {
  InformationCircleIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { SettingsModal } from './components/modals/SettingsModal'
import {
  GAME_TITLE,

  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE
} from './constants/strings'
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  ALERT_TIME_MS,
  GAME_LOST_INFO_DELAY,
} from './constants/settings'
import { isWordInWordList } from './lib/words'
import {
  loadGameStateFromLocalStorage,
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
} from './lib/localStorage'

import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Solver, Wordle } from './lib/solver'
import { WordsModal } from './components/modals/WordsModal'
export type Appearance = 'green' | 'gray' | 'yellow'
function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuesses, setCurrentGuesses] = useState('')
  const [appearances, setAppearances] = useState<Appearance[]>([
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
    'gray',
  ])

  function setCurrentAppearances(i: number, j: number, appearance: Appearance) {
    let temp = appearances
    temp[i * 5 + j] = appearance
    setAppearances(temp)
  }
  const [possibleWords, setPossibleWords] = useState<string[]>([])
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isWordsModalOpen, setIsWordsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )



  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (!loadGameStateFromLocalStorage()) {
      setIsInfoModalOpen(true)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }



  const onChar = (value: string) => {
    if (
      getCurGuessFromCurrentGuesses(currentGuesses).length < MAX_WORD_LENGTH &&
      getGueesesFromCurGuess(currentGuesses).length < MAX_CHALLENGES
    ) {
      setCurrentGuesses(`${currentGuesses}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuesses(currentGuesses.slice(0, -1))
  }

  const onEnter = () => {
    if (
      getCurGuessFromCurrentGuesses(currentGuesses).length !== 0 &&
      !(
        getCurGuessFromCurrentGuesses(currentGuesses).length === MAX_WORD_LENGTH
      )
    ) {
      showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE)
      setCurrentRowClass('jiggle')
      return setTimeout(() => {
        setCurrentRowClass('')
      }, ALERT_TIME_MS)
    }

    if (
      getCurGuessFromCurrentGuesses(currentGuesses).length !== 0 &&
      !isWordInWordList(getCurGuessFromCurrentGuesses(currentGuesses))
    ) {
      showErrorAlert(WORD_NOT_FOUND_MESSAGE)
      setCurrentRowClass('jiggle')
      return setTimeout(() => {
        setCurrentRowClass('')
      }, ALERT_TIME_MS)
    }

    if (
      (getCurGuessFromCurrentGuesses(currentGuesses).length ===
        MAX_WORD_LENGTH ||
        getCurGuessFromCurrentGuesses(currentGuesses).length === 0) &&
      getGueesesFromCurGuess(currentGuesses).length < MAX_CHALLENGES
    ) {
      if (currentGuesses.length === MAX_WORD_LENGTH) {
      }



      // enforce hard mode - all guesses must contain all previously revealed letters
      let wordles: Wordle[] = getGueesesFromCurGuess(currentGuesses).map(
        (guess, i) => {
          return {
            word: guess,
            appearances: appearances.slice(5 * i, 5 + 5 * i),
          }
        }
      )
      setPossibleWords(Solver(wordles))
      setIsWordsModalOpen(true)
    }
  } 

  return (
    <div className="pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8 mt-20">
        <h1 className="text-xl ml-2.5 grow font-bold dark:text-white">
          {GAME_TITLE}
        </h1>
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <CogIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsSettingsModalOpen(true)}
        />
      </div>
      <Grid
        guesses={getGueesesFromCurGuess(currentGuesses)}
        currentGuess={getCurGuessFromCurrentGuesses(currentGuesses)} 
        currentRowClassName={currentRowClass}
        setCurrentAppearances={setCurrentAppearances}
      />
      <Keyboard onChar={onChar} onDelete={onDelete} onEnter={onEnter} />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <WordsModal
        isOpen={isWordsModalOpen}
        handleClose={() => setIsWordsModalOpen(false)}
        isDarkMode={isDarkMode}
        handleDarkMode={handleDarkMode}
        possibleWords={possibleWords}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
        isDarkMode={isDarkMode}
        handleDarkMode={handleDarkMode}
        isHighContrastMode={isHighContrastMode}
        handleHighContrastMode={handleHighContrastMode}
      />

      <AlertContainer />
    </div>
  )
}

export default App

function getGueesesFromCurGuess(currentGuesses: string) {
  let uzunluk = Math.floor(currentGuesses.length / MAX_WORD_LENGTH)
  let res: string[] = []
  for (let i = 0; i < uzunluk; i++) {
    res.push(
      currentGuesses.slice(i * MAX_WORD_LENGTH, (i + 1) * MAX_WORD_LENGTH)
    )
  }
  return res
}
function getCurGuessFromCurrentGuesses(currentGuesses: string) {
  let len = currentGuesses.length % 5
  return currentGuesses.slice(currentGuesses.length - len)
}
