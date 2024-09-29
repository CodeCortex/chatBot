// Chatbot.js
import React, { useState } from 'react';
import ChatbotIcon from './ChatbotIcon';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', sender: 'bot' },
  ]);

  // Function to toggle chatbox visibility
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle sending messages
  const handleSend = (message) => {
    if (message.trim() === '') return;

    const userMessage = { text: message, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Simulate a bot response (can be replaced with API call)
    setTimeout(() => {
      const botMessage = { text: `You said: ${message}`, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot Icon */}
      <ChatbotIcon toggleChat={toggleChat} />

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white p-4 shadow-lg rounded-lg w-80 h-80 flex flex-col">
          {/* Messages */}
          <ChatMessages messages={messages} />
          {/* Input */}
          <ChatInput handleSend={handleSend} />
        </div>
      )}
    </>
  );
};

export default Chatbot;
