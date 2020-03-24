import React, { useState, useEffect } from 'react';
import './App.css';
import useInterval from './useInterval';

function App() {
  const textToCopy: string = "Lorem ipsum";
  const [textTyped, setTextTyped] = useState<string>("");
  const [timing, toggleTiming] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  useInterval(() => {
    setTime(time + 1);
  }, timing ? 1000 : null);

  useEffect(() => {
    if (textTyped === textToCopy) {
      toggleTiming(false);
    }
  }, [textTyped]);

  return (
    <div className="container">
      <p>{textToCopy}</p>
      <textarea onChange={e => setTextTyped(e.target.value)}></textarea>
      <div style={{ color: textTyped === textToCopy ? 'green' : 'black'}}>{textTyped}</div>
      <p>{time}</p>
      <button onClick={() => toggleTiming(true)}>Start</button>
    </div>
  );
}

export default App;
