import React, { useState } from 'react';
import ChatbotIcon from './ChatbotIcon';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialMessages = [
    { text: 'Hello! How can I assist you today?', sender: 'bot' },
  ];

  // Function to fetch messages from localStorage (simulate user-specific storage)
  const getStoredMessages = () => {
    const savedMessages = localStorage.getItem('chatbotMessages');
    return savedMessages ? JSON.parse(savedMessages) : initialMessages;
  };

  const [messages, setMessages] = useState(getStoredMessages());
  const [loading, setLoading] = useState(false); // Loading state

  // Function to toggle chatbox visibility and reset messages
  const toggleChat = () => {
    setIsOpen((prevIsOpen) => {
      if (prevIsOpen) {
        // If closing the chatbox, clear only the specific messages
        localStorage.removeItem('chatbotMessages'); // Clear only the messages
        setMessages(initialMessages);
      } else {
        // If opening the chatbox, reset messages
        setMessages(initialMessages);
      }
      return !prevIsOpen;
    });
  };

  // Function to handle sending messages
  const handleSend = async (message) => {
    if (message.trim() === '') return;

    const userMessage = { text: message, sender: 'user' };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setLoading(true); // Start loading

    try {
      const response = await fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message }),
      });
      const data = await response.json();

      const botMessage = { text: data.response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const botMessage = { text: 'Something went wrong. Please try again.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <ChatbotIcon toggleChat={toggleChat} />

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white p-4 shadow-lg rounded-lg w-[450px] h-[450px] flex flex-col">
          {/* Messages */}
          <ChatMessages messages={messages} />
          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-center justify-center mt-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="ml-2">Loading...</span>
            </div>
          )}
          {/* Input */}
          <ChatInput handleSend={handleSend} />
        </div>
      )}
    </>
  );
};

export default Chatbot;
