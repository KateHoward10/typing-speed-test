import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import useInterval from './useInterval';
import { TextToCopy } from './Components/TextToCopy';
import { TextField } from './Components/TextField';
import { Box } from './Components/Box';
import { Result } from './Components/Result';
import { formatTime, numberOfWords, numberOfErrors, formatText } from './helpers';

function App() {
  const endpoint = "https://litipsum.com/api/5";
  const [textToCopy, setTextToCopy] = useState<string>("");
  const [textTyped, setTextTyped] = useState<string>("");
  const [timing, toggleTiming] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);
  const [showResult, toggleShowResult] = useState<boolean>(false);

  useInterval(() => {
    setTime(time - 1);
    if (time <= 1) {
      toggleTiming(false);
      toggleShowResult(true);
    }
  }, timing ? 1000 : null);

  function getText() {
    axios.get(endpoint)
      .then(response => 
        setTextToCopy(formatText(response.data))
      )
  }

  function type(e: any) {
    if (textTyped === "") toggleTiming(true);
    if (timing) setTextTyped(e.target.value);
  }

  function restart() {
    setTextTyped("");
    setTime(60);
    toggleShowResult(false);
    getText();
  }

  useEffect(getText, []);

  return (
    <div className="wrapper">
      <div className="box-container">
        <Box time>{formatTime(time)}</Box>
        <Box>Words: {numberOfWords(textTyped)}</Box>
        <Box>Errors: {numberOfErrors(textTyped, textToCopy)}</Box>
      </div>
      <div className="text-container">
        <TextToCopy textToCopy={textToCopy} textTyped={textTyped} />
        <TextField onChange={type} textTyped={textTyped} />
      </div>
      {showResult && <Result words={numberOfWords(textTyped)} errors={numberOfErrors(textTyped, textToCopy)} restart={restart} />}
    </div>
  );
}

export default App;
