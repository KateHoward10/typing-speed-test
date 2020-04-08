import React, { useState, useEffect } from 'react';
import './App.css';
import useInterval from './useInterval';
import { TextField } from './Components/TextField';

function App() {
  const endpoint = "http://www.randomtext.me/api/lorem/p-1/20-30";
  const [textToCopy, setTextToCopy] = useState<string>("");
  const [textTyped, setTextTyped] = useState<string>("");
  const [timing, toggleTiming] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);

  useInterval(() => {
    setTime(time - 1);
    if (time <= 1) toggleTiming(false);
  }, timing ? 1000 : null);

  useEffect(() => {
    if (textTyped === textToCopy) {
      toggleTiming(false);
    }
  }, [textTyped, textToCopy]);


  function start() {
    toggleTiming(true);
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data =>
        setTextToCopy(data.text_out.replace(/(<([^>]+)>)/ig,""))
      );
  }

  return (
    <div className="container">
      <p>{textToCopy.split(" ").map((word, index) => (
        <span key={index} style={{ color: index === textTyped.split(" ").length - 1 ? 'green' : textTyped.split(" ")[index] === word ? 'grey' : 'black'}}> {word}</span>
      ))}</p>
      <TextField onChange={e => setTextTyped(e.target.value)} />
      <p>{Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}</p>
      <button onClick={start}>Start</button>
      <p>Words typed: {textTyped.split(" ").length - 1}</p>
      <p>Errors: {textTyped.split(" ").filter((word, index) => textToCopy.split(" ")[index] !== word).length}</p>
    </div>
  );
}

export default App;
