"use client";
import Droparea from "../ActionArea/Droparea";
import Typewriter from "typewriter-effect";

const HomeSection = () => {
  return (
    
    <section className="flex flex-col items-center justify-start h-[35vh] bg-white text-center px-4 md:px-0 py-[50px]">
      <div className="max-w-3xl">
        <div className="flex flex-col items-center mb-4 space-y-[20px]">
          <span className="text-5xl font-semibold  text-gray-800">Convert</span>
          <span className="text-6xl font-bold custom-gradient ">
            <Typewriter
              options={{
                strings: ["Class Schedules", "Appointments", "Event Timings"],
                autoStart: true,
                loop: true,
                deleteSpeed: 35,
                delay: 100,
              }}
            />
          </span>
          <span className="text-5xl font-semibold  text-gray-800">
            into Calendar Events
          </span>
          <span className="text-xl font-medium  text-gray-400 pt-[20px]">
            ✨ with Just a Few Clicks ✨
          </span>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
