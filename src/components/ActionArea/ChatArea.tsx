"use client";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import ChatBubble from "./ChatBubble";

//interfaces
interface Part {
  type: string;
  text: string;
}
interface MsgItem {
  role: string;
  parts: Part[];
}
interface ChatAreaProps {
  jsonData: any; // Raw JSON data to display
}

const ChatArea: React.FC<ChatAreaProps> = ({ jsonData }) => {
  const firstMessage = {
    role: "user",
    parts: "You are going to talk to me !",
  };
  const [messageList, setMessageList] = React.useState([firstMessage]);
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

  //Message handlers
  const handleChatMessage = async () => {
    if (chatMessage.trim()) {
      const newMessage = { role: "user", parts: chatMessage };
      setMessageList([...messageList, newMessage]);
      setChatMessage("");

      try {
        console.log("call made to API ");
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: [...messageList, newMessage] }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response from the chat API");
        }

        const data = await response.json();
        setMessageList((prevMessages) => [
          ...prevMessages,
          { role: "model", parts: data.reply },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
        // Handle error (e.g., show an error message to the user)
      }
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
              {messageList.map((msg, index) => (
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
