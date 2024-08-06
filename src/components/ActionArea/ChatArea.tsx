"use client";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import ChatBubble from "./ChatBubble";
import EventCard from "./EventCard";
import CalendarArea from "./Calendar/CalendarArea";

//interfaces
interface Part {
  text: string;
}

interface MsgItem {
  role: string;
  parts: Part[];
}

interface ChatAreaProps {
  jsonData: any; // Raw JSON data to display
}

interface Event {
  summary: string;
  start: string;
  end: string;
  description: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ jsonData }) => {
  const [messageList, setMessageList] = useState<MsgItem[]>([]);
  const [chatMessage, setChatMessage] = React.useState("");
  const messagesContainerRef = React.useRef<HTMLDivElement | null>(null);
  const isInitializedRef = React.useRef(false);
  const [currentJsonData, setCurrentJsonData] = useState(jsonData);

  //fixscrolling in chat
  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messageList]);

  //init chat with bot upon loading component
  React.useEffect(() => {
    if (!isInitializedRef.current) {
      initializeChat();
    }
  }, [jsonData]);

  const initializeChat = async () => {
    const initialMessage: MsgItem = {
      role: "user",
      parts: [
        {
          text: `I have a JSON google calendar object that I need help editing. Here's the current JSON data:
        ${JSON.stringify(jsonData, null, 2)}
        I'm going to give instructions on editing this. for the first msg reply "Make changes by talking to the bot!", the user will give further editing instructions
        and rest say "Made the requested Changes!". finally, after every bot reply add the updated JSON enclosed in triple backticks like this: \`\`\`json ... \`\`\`.
        `,
        },
      ],
    };
    setMessageList([initialMessage]);
    isInitializedRef.current = true;

    // Send the initial message to the API
    await sendMessageToAPI(initialMessage);
  };

  const sendMessageToAPI = async (message: MsgItem) => {
    //
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messageList, message] }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from the chat API");
      }

      try {
        // Fetch the response text from the server
        const jsonText = await response.json();

        const text = jsonText.reply;
        //console.log(text.reply)

        console.log(text);

        // Extract the JSON part if it exists
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);

        if (jsonMatch) {
          // JSON data found; parse it
          const updatedJson = JSON.parse(jsonMatch[1].trim());
          setCurrentJsonData(updatedJson); // Update state with the parsed JSON data

          // Everything before the JSON data is the bot's reply
          const botReply = text.substring(0, jsonMatch.index).trim();

          // Update the message list with the bot's reply
          setMessageList((prevMessages) => [
            ...prevMessages,
            { role: "model", parts: [{ text: botReply }] },
          ]);
        } else {
          // If no JSON data is found, treat the entire text as the bot's reply
          setMessageList((prevMessages) => [
            ...prevMessages,
            { role: "model", parts: [{ text: text }] },
          ]);
          console.log("No JSON data found in the response.");
        }
      } catch (error) {
        console.error("Error parsing JSON from response:", error);
      }

      // const reader = response.body?.getReader();
      // if (!reader) {
      //   throw new Error("Failed to get reader from response");
      // }

      // let accumulatedText = "";
      // setMessageList((prevMessages) => [
      //   ...prevMessages,
      //   { role: "model", parts: [{ text: "" }] },
      // ]);

      // while (true) {
      //   const { done, value } = await reader.read();
      //   if (done) break;

      //   const chunk = new TextDecoder().decode(value);
      //   const lines = chunk.split("\n\n");
      //   for (const line of lines) {
      //     if (line.startsWith("data: ")) {
      //       const data = JSON.parse(line.slice(6));
      //       if (data.done) {
      //         //setIsLoading(false);
      //         break;
      //       }
      //       accumulatedText += data.text;
      //       setMessageList((prevMessages) => {
      //         const newMessages = [...prevMessages];
      //         const lastMessage = newMessages[newMessages.length - 1];
      //         lastMessage.parts[0].text = accumulatedText;
      //         return newMessages;
      //       });

      //       // Check if the response contains updated JSON
      //       try {
      //         const jsonMatch = accumulatedText.match(
      //           /```json\n([\s\S]*?)\n```/
      //         );
      //         if (jsonMatch) {
      //           const updatedJson = JSON.parse(jsonMatch[1].trim());
      //           setCurrentJsonData(JSON.parse(updatedJson));
      //         }
      //       } catch (error) {
      //         console.error("Error parsing JSON from response:", error);
      //       }
      //     }
      //   }
      // }
    } catch (error) {
      console.error("Error sending message:", error);
      //setIsLoading(false);
    }
  };

  const handleChatMessage = async () => {
    if (chatMessage.trim()) {
      const newMessage: MsgItem = {
        role: "user",
        parts: [{ text: chatMessage }],
      };
      console.log(chatMessage);
      setMessageList((oldChatHistory) => [...oldChatHistory, newMessage]);
      setChatMessage("");
      await sendMessageToAPI(newMessage);
    }
  };

  const sendtoCalendar = (jsonData: any) => {
    //take the data and send to calendar
    //depending on the calendar of choise
  };

  return (
    <div className="flex flex-col justify-start items-center w-full h-fit">
      <div className="flex w-[110%] h-[80vh] mt-8 bg-whitejustify-center items-center space-x-5  border-2 border-gray-300 border-dashed px-4 rounded-2xl">
        {/* Left block for JSON data */}
        <div className="flex w-[80%] h-[95%] p-4 justify-center shadow-xl rounded-2xl bg-gray-100">
          <div className="overflow-scroll w-full ">
            <div className="h-screen p-4 pb-36">
              {/* fix this any type, you loser  */}
              {currentJsonData.map((event: any, index: any) => (
                <EventCard
                  key={index}
                  summary={event.summary}
                  start={new Date(event.start.dateTime).toLocaleString(
                    "en-US",
                    { timeZone: event.start.timeZone }
                  )}
                  end={new Date(event.end.dateTime).toLocaleString("en-US", {
                    timeZone: event.end.timeZone,
                  })}
                  description={event.description}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right block for chatbox */}
        <div className="flex flex-col items-center w-[40%] h-[95%] space-y-2">
          <div className="flex flex-col w-[100%] h-[90%] p-4 justify-center shadow-xl rounded-2xl bg-gray-100">
            <div
              className="overflow-scroll w-full h-full bg-transperant"
              ref={messagesContainerRef}
            >
              <div className=" p-4 pb-36  bg-transparent">
                {messageList.slice(1).map((item, index) => (
                  <ChatBubble key={index} msgItem={item} />
                ))}
              </div>
            </div>

            <div className=" flex  bg-[#ffffff] rounded-full px-4 py-2 shadow">
              <input
                type="text"
                placeholder="Append the points to Event name"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 mx-4 bg-transparent text-gray-800 placeholder-gray-300 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    //&& !isLoading
                    handleChatMessage();
                  }
                }}
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

          <div className="">{<CalendarArea calendarobj={jsonData} />}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
