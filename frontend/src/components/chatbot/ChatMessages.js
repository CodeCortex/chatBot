// components/ChatMessages.js
import React, { useRef, useEffect } from 'react';

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat ${message.sender === 'user' ? 'chat-end' : 'chat-start'} mb-2`}
        >
          <div
            className={`chat-bubble ${
              message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      {/* Empty div to ensure the chat scrolls to the bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
