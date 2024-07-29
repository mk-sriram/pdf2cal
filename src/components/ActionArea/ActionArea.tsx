import Droparea from "./Droparea";

const ActionArea = () => {
  return (
    <section className="flex flex-col items-center justify-start h-fit bg-whitetext-center px-4 md:px-0 mt-[30px] mb-[150px]">
      <div className="w-[50%] py-8">
        <Droparea />
      </div>
    </section>
  );
};

export default ActionArea;
