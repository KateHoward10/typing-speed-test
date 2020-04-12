import React from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
  words: number,
  errors: number,
  restart: () => void
}

export const Result: React.FC<Props> = ({ words, errors, restart }) => {
  const accuracy = (words - errors) / words;
  const speed = Math.floor(words * accuracy);
  const labels = [20,40,60,80];

  return (
    <div className="overlay">
      <div className="modal">
        <p>{words} words typed <FaTimes /> {Math.floor(accuracy * 100)}% accuracy</p>
        <h3>Adjusted speed: {speed} WPM</h3>
        <div className="result-chart">
          {labels.map(number => <div className="marker" style={{ left: `${number * 3}px` }} />)}
          <div className="marker result-marker" style={{ left: `${speed * 3}px` }} />
        </div>
        <div className="chart-labels">
          {labels.map(number => <span>{number}</span>)}
        </div>
        <button onClick={restart}>Try again</button>
      </div>
    </div>
  )
}