"use client";

import React, { useEffect, useState } from "react";

const DemoSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section
      id="demo"
      className="leading-relaxed w-[65%] mt-[10rem] mx-auto px-4 md:px-8 justify-center flex items-center  pt-14"
    >
      <div className="rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-[10px] border-white overflow-hidden">
        {isClient && (
          <video
            className="w-full h-full rounded-lg"
            controls
            controlsList="nodownload"
          >
            <source src="/Demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </section>
  );
};

export default DemoSection;
