import React, { useState, useEffect } from 'react';

const prompts = [
  "What emotion are you avoiding right now?",
  "What would your younger self be proud of you for?",
  "If your pain could speak, what would it say?",
  "What do you need to hear right now?",
  "What is the kindest sentence you can write to yourself?",
  "Write a letter to the future you.",
  "What does safety feel like?",
  "What have you survived that no one saw?",
];

function App() {
  const [prompt, setPrompt] = useState('');
  const [entry, setEntry] = useState('');
  const [whisper, setWhisper] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const generatePrompt = () => {
    const index = Math.floor(Math.random() * prompts.length);
    setPrompt(prompts[index]);
    setWhisper('');
  };

  const handleWhisper = () => {
    if (!entry.trim()) {
      setWhisper("Try writing a bit first — I'll be here.");
    } else {
      setWhisper("What part of this still feels like it's holding its breath?");
    }
  };

  return (
    <div className="app">
      <div className="header">
        <div>{time.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
        <div>{time.toLocaleTimeString()}</div>
      </div>
      <h1>Northern Journal</h1>
      <button onClick={generatePrompt}>Generate Prompt</button>
      {prompt && <p><strong>Prompt:</strong> {prompt}</p>}
      <textarea
        placeholder="Write from the heart..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <div>
        <button onClick={handleWhisper}>Whisper from the Lantern</button>
        <button onClick={() => setEntry('')}>Clear</button>
        <button onClick={() => navigator.clipboard.writeText(entry)}>Copy</button>
      </div>
      {whisper && <p><em>{whisper}</em></p>}
    </div>
  );
}

export default App;