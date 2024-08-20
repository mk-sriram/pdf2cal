export default function PageIllustration() {
  return (
    <>
      {/* Stripes illustration */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform scale-75 md:scale-100"
        aria-hidden="true"
      >
        {/* Circles */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 md:ml-[400px]">
          <div className="h-60 w-60 md:h-80 md:w-80 rounded-full bg-gradient-to-tr from-[#61abffd4] opacity-50 blur-[80px]" />
        </div>
        <div className="absolute top-[300px] left-1/2 transform -translate-x-1/2 md:ml-[300px]">
          <div className="h-60 w-60 md:h-80 md:w-80 rounded-full bg-gradient-to-tr from-[#6bb0ffd4] to-white opacity-50 blur-[80px]" />
        </div>
        <div className="absolute top-[500px] left-1/2 transform -translate-x-1/2 md:-ml-[200px]">
          <div className="h-60 w-60 md:h-80 md:w-80 rounded-full bg-gradient-to-tr from-[#8ac0ffd4] to-white opacity-50 blur-[80px]" />
        </div>
      </div>
    </>
  );
}
