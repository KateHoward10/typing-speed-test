import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import useInterval from './useInterval';
import { TextToCopy } from './Components/TextToCopy';
import { TextField } from './Components/TextField';
import { Box } from './Components/Box';
import { Result } from './Components/Result';
import { formatTime, numberOfWords, numberOfErrors, formatText } from './helpers';
import { FaKeyboard, FaHistory } from "react-icons/fa";

function App() {
  const endpoint = "https://litipsum.com/api/5";
  const [textToCopy, setTextToCopy] = useState<string>("");
  const [textTyped, setTextTyped] = useState<string>("");
  const [timing, toggleTiming] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);
  const [showResult, toggleShowResult] = useState<boolean>(false);
  let textareaRef = useRef<HTMLTextAreaElement>(null);

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

  function type(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (textTyped === "") toggleTiming(true);
    if (time !== 0) setTextTyped(e.target.value);
  }

  function restart() {
    setTextTyped("");
    setTime(60);
    toggleShowResult(false);
    getText();
    if (textareaRef?.current) textareaRef.current.focus();
  }

  useEffect(getText, []);

  return (
    <>
      <h1><FaKeyboard /> Typing Speed Test <FaKeyboard /></h1>
      <p className="instructions">Copy passages from classic works of literature to find your average words per minute.</p>
      <div className="wrapper">
        <div className="box-container">
          <Box time>{formatTime(time)}</Box>
          <Box label="Words">{numberOfWords(textTyped)}</Box>
          <Box label="Errors" error>{numberOfErrors(textTyped, textToCopy)}</Box>
          <button className="cancel-button" onClick={restart}>{window?.innerWidth > 700 ? "New text" : <FaHistory />}</button>
        </div>
        <div className="text-container">
          <TextToCopy textToCopy={textToCopy} textTyped={textTyped} />
          <TextField ref={textareaRef} onChange={type} textTyped={textTyped} />
        </div>
        {showResult && <Result textTyped={textTyped} errors={numberOfErrors(textTyped, textToCopy)} restart={restart} close={() => toggleShowResult(false)} />}
      </div>
      <div className="credit">Text extracts from <a href="https://litipsum.com/">Lit Ipsum</a></div>
    </>
  );
}

export default App;
