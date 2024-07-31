import React, { useState } from "react";

interface ChatAreaProps {
  jsonData: any; // Replace 'any' with a more specific type if you know the structure
}

const ChatArea: React.FC<ChatAreaProps> = ({ jsonData }) => {
  return (
    <div className="flex w-full h-[80vh] mt-8 bg-green-100 justify-center items-center ">
      {/* Left block for JSON data */}
      <div className="w-[40%] h-[95%] p-4 bg-gray-100 overflow-scroll mx-3 shadow-lg ">
        <pre className="whitespace-pre-wrap ">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </div>

      {/* Right block for chatbox */}
      <div className="w-[40%] h-[95%] p-4 bg-white  overflow-scroll shadow-lg">
        <h2 className="text-xl font-bold mb-4">Chatbox</h2>
        {/* Chatbox content will go here */}
        <p>Chatbox functionality coming soon...</p>
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {/* <!-- Incoming Message --> */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">Hey Bob, how's it going?</p>
            </div>
          </div>

          {/* <!-- Outgoing Message --> */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>
                It's about an astronaut stranded on Mars, trying to survive.
                Gripping stuff!
              </p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>

          {/* <!-- Incoming Message --> */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">
                I'm intrigued! Maybe I'll borrow it from you when you're done?
              </p>
            </div>
          </div>

          {/* <!-- Outgoing Message --> */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>Of course! I'll drop it off at your place tomorrow.</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>

          {/* <!-- Incoming Message --> */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">Thanks, you're the best!</p>
            </div>
          </div>

          {/* <!-- Outgoing Message --> */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>Anytime! Let me know how you like it. 😊</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>

          {/* <!-- Incoming Message --> */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">So, pizza next week, right?</p>
            </div>
          </div>

          {/* <!-- Outgoing Message --> */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>Absolutely! Can't wait for our pizza date. 🍕</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          {/* <!-- Incoming Message --> */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">Hoorayy!!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
