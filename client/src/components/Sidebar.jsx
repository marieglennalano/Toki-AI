import React from 'react';
import DarkModeToggle from './DarkModeToggle';

const Sidebar = ({ conversations = [], onNewChat, onSelectChat }) => {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Toki AI</h1>
        <DarkModeToggle />
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
        >
          + New Chat
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-4">
        <h2 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recent</h2>
        {conversations.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-sm">No chats yet</p>
        ) : (
          <ul className="space-y-2">
            {conversations.map((chat, idx) => (
              <li
                key={idx}
                onClick={() => onSelectChat(chat)}
                className="cursor-pointer text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded px-3 py-2 transition"
              >
                {chat.title || `Chat #${idx + 1}`}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500">
        © 2025 Toki AI
      </div>
    </aside>
  );
};

export default Sidebar;
