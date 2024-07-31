import React, { useState } from "react";

interface ChatAreaProps {
  jsonData: any; // Replace 'any' with a more specific type if you know the structure
}

const ChatArea: React.FC<ChatAreaProps> = ({ jsonData }) => {
  return (
    <div className="flex w-full h-[calc(100vh-200px)] mt-8">
      {/* Left block for JSON data */}
      <div className="w-1/2 p-4 bg-gray-100 overflow-auto">
        <h2 className="text-xl font-bold mb-4">JSON Data</h2>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </div>

      {/* Right block for chatbox */}
      <div className="w-1/2 p-4 bg-white">
        <h2 className="text-xl font-bold mb-4">Chatbox</h2>
        {/* Chatbox content will go here */}
        <p>Chatbox functionality coming soon...</p>
      </div>
    </div>
  );
};

export default ChatArea;
