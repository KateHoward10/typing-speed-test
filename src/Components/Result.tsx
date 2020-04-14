import React from "react";
import { FaTimes, FaWalking, FaBicycle, FaTractor, FaCarSide, FaPlane } from "react-icons/fa";

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
          <div className="icon-container"><FaWalking /></div>
          <div className="icon-container"><FaBicycle /></div>
          <div className="icon-container"><FaTractor /></div>
          <div className="icon-container"><FaCarSide /></div>
          <div className="icon-container"><FaPlane /></div>
          <div className="result-marker" style={{ left: `${speed * 3}px` }} />
        </div>
        <div className="chart-labels">
          {labels.map(number => <span>{number}</span>)}
        </div>
        <button onClick={restart}>Try again</button>
      </div>
    </div>
  )
}