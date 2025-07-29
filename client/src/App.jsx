import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Message from './components/Message';
import TypingIndicator from './components/TypingIndicator';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import { IoMdMic } from 'react-icons/io';

const App = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: 'Welcome Chat',
      messages: [
        {
          role: 'assistant',
          content: "Hello! I'm Toki. How can I assist you today?",
        },
      ],
    },
  ]);
  const [activeChatId, setActiveChatId] = useState(1);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const endOfMessagesRef = useRef(null);
  const navigate = useNavigate();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setListening(true);
      setTranscript('');
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      let liveTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        liveTranscript += event.results[i][0].transcript;
      }
      setTranscript(liveTranscript);

      if (event.results[event.resultIndex].isFinal) {
        setInput(liveTranscript);
        setTranscript('');
      }
    };
  }

  const activeChat = conversations.find((chat) => chat.id === activeChatId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || !activeChat) return;

    const userMessage = { role: 'user', content: trimmed };
    const updatedMessages = [
      { role: 'system', content: 'You are a helpful assistant named Toki-AI.' },
      ...activeChat.messages,
      userMessage,
    ];

    const updatedConversations = conversations.map((chat) =>
      chat.id === activeChatId
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    );

    setConversations(updatedConversations);
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
      const assistantMessage = { role: 'assistant', content: reply };

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, assistantMessage] }
            : chat
        )
      );
    } catch (err) {
      console.error('Backend Error:', err);
      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: 'assistant', content: '⚠️ Something went wrong. Try again.' },
                ],
              }
            : chat
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    const newId = Date.now();
    const newChat = {
      id: newId,
      title: `Chat #${conversations.length + 1}`,
      messages: [
        {
          role: 'assistant',
          content: "Hello! I'm Toki. How can I assist you today?",
        },
      ],
    };
    setConversations((prev) => [...prev, newChat]);
    setActiveChatId(newId);
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isTyping]);

  const startListening = () => {
    if (recognition && !listening) recognition.start();
  };

  const stopListening = () => {
    if (recognition && listening) recognition.stop();
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const ChatLayout = () => (
    <>
      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onNewChat={handleNewChat}
        conversations={conversations}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        navigate={navigate}
      />

      <main className="flex-1 flex flex-col relative">
        {/* Message Display */}
        <section className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {activeChat?.messages.map((msg, idx) => (
            <Message
              key={idx}
              sender={msg.role === 'user' ? 'user' : 'ai'}
              text={msg.content}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={endOfMessagesRef} />
        </section>

        {/* Floating Transcript */}
        {listening && transcript && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow text-sm z-50">
            🎤 Listening... <span className="italic">{transcript}</span>
          </div>
        )}

        {/* Chat Input */}
        <footer className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Message input"
            />
            <button
              type="button"
              onClick={toggleListening}
              title={listening ? 'Stop Listening' : 'Start Voice Input'}
              className={`p-3 rounded-full transition duration-300 ${
                listening
                  ? 'bg-red-600 animate-pulse text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'
              }`}
            >
              <IoMdMic size={20} />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              Send
            </button>
          </form>
        </footer>
      </main>
    </>
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Routes>
          <Route path="/" element={<ChatLayout />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
