import React from "react";

interface Props {
  words: number,
  errors: number
}

export const Result: React.FC<Props> = ({ words, errors }) => {

  return (
    <div className="overlay">
      <div className="modal">
        {words - errors} WPM
      </div>
    </div>
  )
}