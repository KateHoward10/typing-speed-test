import React from "react";
import { numberOfWords } from '../helpers';
import { FaTimes, FaWalking, FaBicycle, FaTractor, FaCarSide, FaPlane } from "react-icons/fa";

interface Props {
  textTyped: string,
  errors: number,
  restart: () => void
}

export const Result: React.FC<Props> = ({ textTyped, errors, restart }) => {
  const words = numberOfWords(textTyped);
  const accuracy = (words - errors) / words;
  const speed = Math.floor(words * accuracy);
  const labels = [20,40,60,80];

  return (
    <div className="overlay">
      <div className="modal">
        <p>{words} words typed <FaTimes /> {Math.floor(accuracy * 100)}% accuracy</p>
        <small>{textTyped.length} characters, {errors} errors</small>
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
          {labels.map((number, index) => <span key={index}>{number}</span>)}
        </div>
        <button onClick={restart}>Try again</button>
      </div>
    </div>
  )
}