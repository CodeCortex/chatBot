// components/ChatInput.js
import React, { useState } from 'react';

const ChatInput = ({ handleSend }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend(input);
      setInput('');
    }
  };

  const handleClick = () => {
    handleSend(input);
    setInput('');
  };

  return (
    <div className="flex mt-2">
      <input
        type="text"
        className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your query..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="ml-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none"
        onClick={handleClick}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
