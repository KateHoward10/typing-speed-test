import React, { useState } from 'react';
import './App.css';

function App() {
  const textToCopy: string = "Lorem ipsum";
  const [textTyped, setTextTyped] = useState<string>("");

  return (
    <>
      <p>{textToCopy}</p>
      <textarea onChange={e => setTextTyped(e.target.value)}></textarea>
      <div style={{ color: textTyped === textToCopy ? 'green' : 'black'}}>{textTyped}</div>
    </>
  );
}

export default App;
