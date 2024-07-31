"use client";
import React from "react";
import Droparea from "./Droparea";
import ChatArea from "./ChatArea";

const ActionArea = () => {
  const [jsonData, setJsonData] = React.useState(null);

  const handleFileProcessed = (data: any) => {
    setJsonData(data);
  };

  return (
    <section className="flex flex-col items-center justify-start h-fit bg-white text-center px-4 md:px-0 mt-[30px] mb-[150px]">
      <div className="w-[50%] py-8">
        <Droparea />
      </div>
      <ChatArea jsonData={jsonData} />
    </section>
  );
};

export default ActionArea;
