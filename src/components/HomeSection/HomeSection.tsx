

import Droparea from "./Droparea";

const HomeSection = () => {
  return (
    <section className="flex flex-col items-center justify-start h-[100vh] bg-white text-center px-4 md:px-0 py-[80px]">
      <div className="max-w-3xl">
        <div className="flex flex-col items-center mb-4 space-y-[15px]">
          <span className="text-5xl font-semibold  text-gray-800">Convert</span>
          <span className="text-7xl font-bold custom-gradient ">Schedule</span>
          <span className="text-5xl font-semibold  text-gray-800">
            to Calendar
          </span>
        </div>
      </div>
      <div className="w-[50%] py-8">
        <Droparea />
      </div>

      
    </section>
  );
};

export default HomeSection;
