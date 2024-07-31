"use client";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
interface MsgItem {
  role: string;
  content: string;
}

const ChatBubble: React.FC<{ msgItem: MsgItem }> = ({ msgItem }) => {
  const { role, content } = msgItem;

  // Determine if the message is from the user
  const isUser = role === "user";
  // Apply different styles based on the role
  const bubbleClass = isUser
    ? "bg-[#0b7dffd4] text-white"
    : "bg-white text-gray-800";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 `}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2 shadow bg-white">
          <img
            src="/parsylllogotrans.png"
            alt="User Avatar"
            className="w-6 h-6 rounded-full"
          />
        </div>
      )}
      <div
        className={` flex max-w-96 p-3 gap-3 shadow rounded-3xl px-4 ${bubbleClass}`}
      >
        {content}
      </div>
    </div>
  );
};

interface ChatAreaProps {
  jsonData: any; // Raw JSON data to display
  chatMessages: MsgItem[]; // Array of chat messages
}

// Example usage with placeholder data

const ChatArea: React.FC<ChatAreaProps> = ({ jsonData, chatMessages }) => {
  const [messageList, setMessageList] = React.useState(chatMessages);
  const [chatMessage, setChatMessage] = React.useState("");
  const messagesContainerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Scroll to the bottom of the messages container
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messageList]);

  //handleSendingChat messages
  const handleChatMessage = () => {
    if (chatMessage.trim()) {
      setMessageList([...messageList, { role: "user", content: chatMessage }]);
      setChatMessage("");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center w-full h-fit">
      <div className="flex w-[85%] h-[80vh] mt-8 bg-whitejustify-center items-center space-x-5  border-2 border-gray-300 border-dashed px-4 rounded-2xl">
        {/* Left block for JSON data */}
        <div className="flex w-[60%] h-[95%] p-4 justify-center shadow-xl rounded-2xl bg-gray-100">
          <div className="overflow-scroll w-full ">
            <div className="h-screen p-4 pb-36">
              {JSON.stringify(jsonData, null, 2)}
            </div>
          </div>
        </div>

        {/* Right block for chatbox */}
        <div className="flex flex-col w-[40%] h-[95%] p-4 justify-center shadow-xl rounded-2xl bg-gray-100">
          <div
            className="overflow-scroll w-full  bg-transparent"
            ref={messagesContainerRef}
          >
            <div className=" p-4 pb-36 bg-transparent">
              {chatMessages.map((msg, index) => (
                <ChatBubble key={index} msgItem={msg} />
              ))}
            </div>
          </div>

          <div className=" flex  bg-[#ffffff] rounded-full px-4 py-2 shadow">
            <input
              type="text"
              placeholder="Message Parsyll"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1 mx-4 bg-transparent text-gray-800 placeholder-gray-300 outline-none"
              onKeyDown={handleChatMessage}
            />

            {/* Send Button */}
            <div
              onClick={handleChatMessage}
              className="flex items-center justify-center w-8 h-8 bg-white text-[#0b7dffd4] hover:text-white rounded-full cursor-pointer hover:bg-[#95c6ff]  duration-300 transition-all ease-in-out shadow"
            >
              <FaArrowUp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
