import React from 'react'
import { useMorseCode } from '../hooks/useMorseCode'

const MorseArea = () => {
  const {
    isPressed,
    translatedText,
    morseCurrentState,
    onMouseDown,
    onMouseUp,
    clearText,
  } = useMorseCode()

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-black text-white">
      <div className="flex flex-col items-center">
        <div className="w-[300px] h-[54px] mb-8 border-b-2 border-white border-solid text-[32px]">
          {translatedText} {morseCurrentState}
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
