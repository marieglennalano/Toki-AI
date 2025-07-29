import React, { useEffect, useRef, useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Sidebar = ({ conversations = [], onNewChat, onSelectChat }) => {
  const recentRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const [textSize, setTextSize] = useState('medium');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  useEffect(() => {
    if (recentRef.current) {
      recentRef.current.scrollTop = recentRef.current.scrollHeight;
    }
  }, [conversations]);

  const handleTextSizeChange = (e) => {
    setTextSize(e.target.value);
    document.documentElement.style.setProperty('--text-size', e.target.value);
  };

  const toggleVoice = () => setVoiceEnabled(!voiceEnabled);

  return (
    <>
      <aside className="w-64 h-screen bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Toki AI</h1>
          <DarkModeToggle />
        </div>

        <div className="p-4">
          <button
            onClick={onNewChat}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            + New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4" ref={recentRef}>
          <h2 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recent</h2>
          {conversations.length === 0 ? (
            <p className="text-gray-400 dark:text-gray-500 text-sm">No chats yet</p>
          ) : (
            <ul className="space-y-2">
              {conversations.map((chat, idx) => (
                <li
                  key={idx}
                  onClick={() => onSelectChat(chat)}
                  className="cursor-pointer text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-3 py-2 transition"
                >
                  {chat.title || `Chat #${idx + 1}`}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Settings button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
          >
            ⚙️ <span className="ml-2">Settings</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 text-xs text-gray-400 dark:text-gray-500">
          © 2025 Toki AI
        </div>
      </aside>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Settings</h2>

            <div className="space-y-4">
              {/* Dark mode toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-200">Dark Mode</span>
                <DarkModeToggle />
              </div>

              {/* Text size selector */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-200">Text Size</span>
                <select
                  value={textSize}
                  onChange={handleTextSizeChange}
                  className="bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white rounded px-2 py-1"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              {/* Voice input toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-200">Voice Input</span>
                <button
                  onClick={toggleVoice}
                  className={`px-3 py-1 text-sm rounded ${
                    voiceEnabled
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-400 text-white hover:bg-gray-500'
                  }`}
                >
                  {voiceEnabled ? 'On' : 'Off'}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
