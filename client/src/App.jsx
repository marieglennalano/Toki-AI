import React, { useEffect, useRef, useState } from 'react';
import Message from './components/Message';

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
        headers: {
          'Content-Type': 'application/json',
        },
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
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="h-screen w-screen flex overflow-hidden dark:bg-gray-900 dark:text-white">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-4">
          <h1 className="text-2xl font-bold mb-4">Toki-AI</h1>
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded mb-4">
            + New Chat
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full py-2 px-4 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition"
          >
            Toggle Dark Mode
          </button>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white dark:bg-gray-900">
            {messages.map((msg, idx) => (
              <Message
                key={idx}
                sender={msg.role === 'user' ? 'user' : 'ai'}
                text={msg.content}
              />
            ))}
            {isTyping && (
              <div className="italic text-sm text-gray-500 dark:text-gray-400">
                Toki-AI is typing...
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 border-t bg-gray-100 dark:bg-gray-800">
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={startListening}
                className={`px-4 py-2 rounded ${
                  listening ? 'bg-red-500' : 'bg-green-500'
                } text-white`}
              >
                🎤
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Send
              </button>
            </form>
            {listening && (
              <p className="text-xs text-gray-500 mt-1">Listening...</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
