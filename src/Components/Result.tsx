import React from "react";

interface Props {
  words: number,
  errors: number
}

export const Result: React.FC<Props> = ({ words, errors }) => {
  const accuracy = (words - errors) / words;

  return (
    <div className="overlay">
      <div className="modal">
        <p>{words} words typed</p>
        <p>{Math.floor(accuracy * 100)}% accuracy</p>
        <p>Adjusted speed: {Math.floor(words * accuracy)} WPM</p>
      </div>
    </div>
  )
}