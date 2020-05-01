import React from "react";
import { numberOfWords } from '../helpers';
import { FaTimes, FaWalking, FaBicycle, FaTractor, FaCarSide, FaPlane } from "react-icons/fa";

interface Props {
  textTyped: string,
  errors: number,
  restart: () => void,
  close: () => void
}

export const Result: React.FC<Props> = ({ textTyped, errors, restart, close }) => {
  const words = numberOfWords(textTyped);
  const accuracy = (words - errors) / words;
  const speed = Math.floor(words * accuracy);
  const labels = [20,40,60,80];

  return (
    <div className="overlay">
      <div className="modal">
        <div onClick={close} className="close-button"><FaTimes /></div>
        <div className="results-wrapper">
          <div className="result-box">
            <p>{words} word{words > 1 && "s"} typed</p>
            <small>{textTyped.length} character{textTyped.length > 1 && "s"}</small>
          </div>
          <div className="result-box">
            <p>{Math.floor(accuracy * 100)}% accuracy</p>
            <small>{errors} error{errors > 1 && "s"}</small>
          </div>
        </div>
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