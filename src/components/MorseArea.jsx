import React, { useEffect, useRef, useState } from 'react'
import {
  FIVE_HUNDRED_MILLISECONDS,
  TWO_HUNDRED_MILLISECONDS,
} from '../constants/time'
import {
  MORSE_ALPHABET,
  MORSE_DOT,
  MORSE_LINE,
} from '../constants/morse-alphabet'

const MorseArea = () => {
  const timer = useRef()

  const [isPressed, setIsPressed] = useState(false)
  const [pressStartValue, setPressStartValue] = useState(0)
  const [morseCurrentState, setMorseCurrentState] = useState('')
  const [text, setText] = useState('')

  const onMouseDown = () => {
    clearTimeout(timer.current)
    setIsPressed(true)
    setPressStartValue(Date.now())
  }
  const onMouseUp = () => {
    setIsPressed(false)
    const timeDifference = Date.now() - pressStartValue
    if (timeDifference < TWO_HUNDRED_MILLISECONDS) {
      setMorseCurrentState((prev) => prev + MORSE_DOT)
    } else {
      setMorseCurrentState((prev) => prev + MORSE_LINE)
    }

    setPressStartValue(0)
  }
  const clearText = () => {
    setText('')
    setMorseCurrentState('')
  }

  useEffect(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const currentLetter = MORSE_ALPHABET[morseCurrentState]

      if (currentLetter) {
        setText((prev) => prev + currentLetter)
      }

      setMorseCurrentState('')
    }, FIVE_HUNDRED_MILLISECONDS)
  }, [morseCurrentState])

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-black text-white">
      <div className="flex flex-col items-center">
        <div className="w-[300px] h-[54px] mb-8 border-b-2 border-white border-solid text-[32px]">
          {text} {morseCurrentState}
        </div>

        <div
          className={`w-[200px] h-[200px] rounded-3xl border-solid border-white border-4 cursor-pointer ${isPressed && 'opacity-[0.1] bg-gray-50'}`}
          onMouseUp={onMouseUp}
          onMouseDown={onMouseDown}
        />

        <button
          onClick={clearText}
          className="mt-8 border-2 border-white border-solid py-2 px-4 rounded-2xl hover:border-blue-300 hover:text-blue-300"
        >
          CLEAR
        </button>
      </div>
    </div>
  )
}

export default MorseArea
