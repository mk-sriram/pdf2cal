
export default function PageIllustration() {
  return (
    <>
      {/* Stripes illustration */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
        aria-hidden="true"
      ></div>
      {/* Circles */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 ml-[580px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-[#61abffd4] opacity-50 blur-[100px]" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[420px] ml-[380px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-[#6bb0ffd4] to-white opacity-50 blur-[100px]" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[640px] -ml-[300px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-[#8ac0ffd4] to-white opacity-50 blur-[100px]" />
      </div>
    </>
  );
}
