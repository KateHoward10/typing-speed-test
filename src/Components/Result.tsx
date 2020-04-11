import React from "react";

interface Props {
  words: number,
  errors: number,
  restart: () => void
}

export const Result: React.FC<Props> = ({ words, errors, restart }) => {
  const accuracy = (words - errors) / words;

  return (
    <div className="overlay">
      <div className="modal">
        <p>{words} words typed</p>
        <p>{Math.floor(accuracy * 100)}% accuracy</p>
        <p>Adjusted speed: {Math.floor(words * accuracy)} WPM</p>
        <button onClick={restart}>Try again</button>
      </div>
    </div>
  )
}