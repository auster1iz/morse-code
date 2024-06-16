import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FIVE_HUNDRED_MILLISECONDS,
  TWO_HUNDRED_MILLISECONDS,
} from '../constants/time'
import {
  MORSE_ALPHABET,
  MORSE_DOT,
  MORSE_LINE,
} from '../constants/morse-alphabet'

export function useMorseCode() {
  const timer = useRef()

  const [isPressed, setIsPressed] = useState(false)
  const [pressStartTime, setPressStartTime] = useState(0)
  const [morseCurrentState, setMorseCurrentState] = useState('')
  const [translatedText, setTranslatedText] = useState('')

  const onMouseDown = () => {
    clearTimeout(timer.current)
    setIsPressed(true)
    setPressStartTime(Date.now())
  }

  const onMouseUp = () => {
    setIsPressed(false)

    const timeDifference = Date.now() - pressStartTime

    if (timeDifference < TWO_HUNDRED_MILLISECONDS) {
      setMorseCurrentState((prev) => prev + MORSE_DOT)
    } else {
      setMorseCurrentState((prev) => prev + MORSE_LINE)
    }
  }

  const clearText = () => {
    setTranslatedText('')
    setMorseCurrentState('')
  }

  const translateMorseCode = useCallback(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const translatedLetter = MORSE_ALPHABET[morseCurrentState]

      if (translatedLetter) {
        setTranslatedText((prev) => prev + translatedLetter)
      }

      setMorseCurrentState('')
    }, FIVE_HUNDRED_MILLISECONDS)
  }, [morseCurrentState])

  useEffect(() => {
    translateMorseCode()
  }, [translateMorseCode])

  return {
    isPressed,
    translatedText,
    morseCurrentState,
    onMouseDown,
    onMouseUp,
    clearText,
  }
}
