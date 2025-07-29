import React, { useEffect, useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Settings = () => {
  const [fontSize, setFontSize] = useState('medium');
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  useEffect(() => {
    const savedFont = localStorage.getItem('fontSize');
    const savedVoice = localStorage.getItem('voiceEnabled') === 'true';
    if (savedFont) setFontSize(savedFont);
    setVoiceEnabled(savedVoice);
  }, []);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('voiceEnabled', voiceEnabled);
  }, [fontSize, voiceEnabled]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Settings</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Theme</label>
        <DarkModeToggle />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Font Size</label>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="small">Small</option>
          <option value="medium">Medium (default)</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={voiceEnabled}
            onChange={(e) => setVoiceEnabled(e.target.checked)}
          />
          <span>Enable Voice Mode (Text-to-Speech)</span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
