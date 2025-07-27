import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" />
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-150" />
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-300" />
      <span className="text-sm text-gray-500">Toki-AI is typing...</span>
    </div>
  );
};

export default TypingIndicator;
