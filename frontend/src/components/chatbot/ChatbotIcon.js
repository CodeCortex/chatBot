// components/ChatbotIcon.js
import React from 'react';
import { BsChatDots } from 'react-icons/bs';

const ChatbotIcon = ({ toggleChat }) => {
  return (
    <div className="fixed bottom-4 right-4 z-10">
      <div
        className="bg-blue-500 text-white rounded-full p-4 cursor-pointer shadow-lg hover:bg-blue-600"
        onClick={toggleChat}
      >
        <BsChatDots size={24} />
      </div>
    </div>
  );
};

export default ChatbotIcon;
