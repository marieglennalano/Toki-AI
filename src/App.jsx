import React, { useEffect, useRef, useState } from 'react';
import Message from './components/Message';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm Toki-AI. How can I assist you today?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const endOfMessagesRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: "I'm still learning. But I hear you!" },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white dark:bg-gray-900">
            {messages.map((msg, idx) => (
              <Message key={idx} sender={msg.sender} text={msg.text} />
            ))}
            {isTyping && (
              <div className="italic text-sm text-gray-500 dark:text-gray-400">
                Toki-AI is typing...
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t bg-gray-100 dark:bg-gray-800">
            <form className="flex" onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded mr-2 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Send
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
