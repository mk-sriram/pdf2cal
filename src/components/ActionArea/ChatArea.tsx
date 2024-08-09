"use client";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import ChatBubble from "./ChatBubble";
import EventList from "./EventList/EventList";
import CalendarDrop from "./CalendarDrop";
import TasksListDrop from "./TasksListDrop";
import TaskList from "./TaskList/TaskList";
import SuccessModal from "./SuccessModal";
import { useRouter } from "next/navigation";

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
  isEvent: boolean;
}
interface Event {
  summary: string;
  start: string;
  end: string;
  description: string;
}
interface Calendar {
  id: number;
  color: string;
  name: string;
}
interface Task {
  title: string; // The title of the task. This is the only required field when creating a task.
  due?: string; // The due date/time of the task in RFC 3339 format. This can be useful if you want to set a deadline for the task.
  notes?: string; // Any additional notes or details about the task.
  status?: "needsAction"; // The status of the task, e.g., 'needsAction' for pending tasks or 'completed' for finished tasks. Defaults to 'needsAction'.
  links?: Array<{
    type: string; // The type of the link, such as 'related' or 'attachment'.
    description?: string; // A brief description of what the link is or why it's relevant.
    link: string; // The URL of the resource being linked to.
  }>;
}
interface TaskList {
  id: string;
  name: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ jsonData, isEvent }) => {
  const messagesContainerRef = React.useRef<HTMLDivElement | null>(null);
  const isInitializedRef = React.useRef(false);

  const [messageList, setMessageList] = useState<MsgItem[]>([]);
  const [chatMessage, setChatMessage] = React.useState("");
  const [currentJsonData, setCurrentJsonData] = useState(jsonData);
  //loading states
  const [pageloading, setPageLoading] = useState<boolean>(true);
  const [loadingModal, setloadModal] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean | null>(
    false
  );
  //state variables for SelectedItems
  const [selectedTask, setSelectedTask] = useState<TaskList | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Calendar | null>(null);

  //routing
  const router = useRouter();

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
          text: `
          
          I have a JSON object representing Google Tasks that I need help editing. Here's the current JSON Data  ${JSON.stringify(
            jsonData,
            null,
            2
          )}
          and JSON schema: { "title": "The title of the task. This is the only REQUIRED field when creating a task.", "due": "The due date/time of the task. Always in RFC 3339 timestamp format.", "notes": "Any additional notes or details about the task.", "status": "Set to 'needsAction' by default as all tasks should be incomplete.", "links": [{ "type": "The type of the link, such as 'email' or 'attachment'.", "description": "A brief description of what the link is or why it's relevant.", "link": "The URL of the resource being linked to." }] }
Instructions: 1. Do not change the structure of the JSON and Always follow the SCHEMA. 2. Always format dates in RFC 3339 timestamp format, regardless of how they are provided. 3. Only modify the JSON according to the user's instructions.
Interaction Flow: - For the first message after receiving the JSON schema, reply with: "Make changes by talking to the bot!". - After the user provides further editing instructions, process them and reply with: "Made the requested changes!". - After making the changes, for every bot reply add the updated JSON enclosed in triple backticks like this: \`\`\`json ... \`\`\`.
Ensure that the output always adheres to the provided JSON structure and date format. 
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
    setPageLoading(true);
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

        //console.log(text);

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
    } catch (error) {
      console.error("Error sending message:", error);
      //setIsLoading(false);
    } finally {
      setPageLoading(false);
    }
  };

  const handleChatMessage = async () => {
    if (chatMessage.trim()) {
      const newMessage: MsgItem = {
        role: "user",
        parts: [{ text: chatMessage }],
      };
      //console.log(chatMessage);
      setMessageList((oldChatHistory) => [...oldChatHistory, newMessage]);
      setChatMessage("");
      await sendMessageToAPI(newMessage);
    }
  };

  //Sending to Calendar functions
  const sendtoCalendar = (jsonData: Event[], calendarid: number) => {
    //take the data and send to calendar
    //depending on the calendar of choise
  };
  const handleSuccess = () => {
    // Trigger the modal to open
    setIsSuccessModalOpen(true);
  };

  const sendtoTasks = async () => {
    setloadModal(true);
    try {
      // Create the request payload
      const payload = {
        taskListId: selectedTask?.id, // ID of the task list where the task should be inserted
        taskData: currentJsonData, // JSON data representing the task to be inserted
      };
      console.log(payload);
      // Send a POST request to the backend endpoint
      const response = await fetch("/api/post-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data.message);

        setCurrentJsonData([]);
        setMessageList([]);
        setloadModal(false);
        handleSuccess();
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        setloadModal(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setloadModal(false);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center w-full h-fit">
      {isSuccessModalOpen && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          setIsOpen={setIsSuccessModalOpen}
        />
      )}
      <div className="flex w-[70rem] h-[80vh] mt-8 bg-whitejustify-center items-center space-x-5  border-2 border-gray-300 border-dashed px-4 rounded-2xl">
        {/* Left block for JSON data */}

        {!isEvent ? (
          <TaskList jsonData={currentJsonData} loading={pageloading} />
        ) : (
          <EventList jsonData={currentJsonData} loading={pageloading} />
        )}

        {/* Right block for chatbox */}
        <div className="flex flex-col items-center w-[50%] h-[75vh] space-y-2">
          <div className="flex flex-col w-[100%] h-[90%] p-4 justify-center shadow-lg rounded-2xl bg-gray-100">
            <div
              className="overflow-scroll w-full h-full bg-transperant"
              ref={messagesContainerRef}
            >
              <div className="p-4 pb-36  bg-transparent">
                {messageList.slice(1).map((item, index) => (
                  <ChatBubble key={index} msgItem={item} />
                ))}
              </div>
            </div>

            <div className="flex  bg-[#ffffff] rounded-full px-4 py-2 shadow">
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

          <div className="flex flex-col w-full items-center pt-4 mt-4 ">
            {!isEvent ? (
              <>
                <TasksListDrop setSelectedTask={setSelectedTask} />
                <button
                  className="btn px-4  rounded-full w-[15rem] bg-[#0b7dffd4] text-white  hover:bg-[#6dc1fc] transition-all transform active:scale-[0.98] hover:scale-[1.01] mt-5 pr-8 space-x-1"
                  onClick={sendtoTasks}
                >
                  {loadingModal ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    ""
                  )}
                  Send Tasks!
                </button>
              </>
            ) : (
              <>
                <CalendarDrop setSelectedEvent={setSelectedEvent} />
                <button className="btn px-4 rounded-full bg-[#0b7dffd4] text-white  hover:bg-[#6dc1fc] transition-all transform active:scale-[0.98] hover:scale-[1.01] mt-5">
                  Send to Calendar!
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
