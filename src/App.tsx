import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import useInterval from './useInterval';
import { TextField } from './Components/TextField';
import { Box } from './Components/Box';

function App() {
  const endpoint = "https://litipsum.com/api/5";
  const [textToCopy, setTextToCopy] = useState<string>("");
  const [textTyped, setTextTyped] = useState<string>("");
  const [timing, toggleTiming] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);

  useInterval(() => {
    setTime(time - 1);
    if (time <= 1) toggleTiming(false);
  }, timing ? 1000 : null);

  function getText() {
    axios.get(endpoint)
      .then(response => {
        console.log(response);
        setTextToCopy(response.data);
      })
  }

  function type(e: any) {
    if (textTyped === "") toggleTiming(true);
    setTextTyped(e.target.value);
  }

  useEffect(getText, []);

  return (
    <div className="wrapper">
      <div className="box-container">
        <Box time>{Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}</Box>
        <Box>Words: {textTyped.split(" ").length - 1}</Box>
        <Box>Errors: {textTyped.split(" ").filter((word, index) => textToCopy.split(" ")[index] !== word).length}</Box>
      </div>
      <div className="text-container">
        <div className="text-to-copy">{textToCopy.split(" ").map((word, index) => (
          <span key={index} style={{ color: index === textTyped.split(" ").length - 1 ? 'green' : textTyped.split(" ")[index] === word ? 'grey' : 'black'}}> {word}</span>
        ))}</div>
        <TextField onChange={type} />
      </div>
    </div>
  );
}

export default App;
