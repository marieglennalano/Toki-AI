import React, { useEffect, useRef, useState } from 'react';
import Message from './components/Message';
import TypingIndicator from './components/TypingIndicator';
import Sidebar from './components/Sidebar';

const App = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm Toki-AI. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [listening, setListening] = useState(false);
  const endOfMessagesRef = useRef(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const updatedMessages = [
      { role: 'system', content: 'You are a helpful assistant named Toki-AI.' },
      ...messages,
      { role: 'user', content: trimmed },
    ];

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();
      const reply = data.reply || "Hmm... I didn't quite get that.";
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Backend Error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Something went wrong. Try again.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const startListening = () => {
    if (recognition && !listening) recognition.start();
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Sidebar */}
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((msg, idx) => (
              <Message
                key={idx}
                sender={msg.role === 'user' ? 'user' : 'ai'}
                text={msg.content}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={startListening}
                title="Voice Input"
                className={`px-4 py-2 rounded-lg text-white transition ${
                  listening
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                🎤
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                Send
              </button>
            </form>
            {listening && (
              <p className="text-xs text-gray-500 mt-1 ml-1">Listening…</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
