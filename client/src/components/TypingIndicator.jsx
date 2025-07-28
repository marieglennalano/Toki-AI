import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 pl-4 mb-2">
      <div className="flex space-x-1">
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-75" />
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-150" />
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-300" />
      </div>
      <span className="text-xs text-gray-500">Toki-AI is typing…</span>
    </div>
  );
};

export default TypingIndicator;
