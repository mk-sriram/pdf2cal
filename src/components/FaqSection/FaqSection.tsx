"use client";

import React from "react";
// Define types for the props
interface Faq {
  q: string;
  a: string;
}

interface FaqsCardProps {
  faqsList: Faq;
  idx: number;
}

const FaqsCard: React.FC<FaqsCardProps> = ({ faqsList, idx }) => {
  const answerElRef = React.createRef<HTMLDivElement>();
  const [state, setState] = React.useState(false);
  const [answerH, setAnswerH] = React.useState("0px");

  const handleOpenAnswer = () => {
    if (answerElRef.current) {
      const answerElH = (answerElRef.current.children[0] as HTMLElement)
        .scrollHeight;
      setState(!state);
      setAnswerH(`${answerElH + 20}px`);
    }
  };

  return (
    <div
      className="space-y-3 mt-5 overflow-hidden border-b"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium">
        {faqsList.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div>
          <p className="text-gray-500">{faqsList.a}</p>
        </div>
      </div>
    </div>
  );
};

const FaqSection: React.FC = () => {
  const faqsList: Faq[] = [
    {
      q: "How is my data secured?",
      a: "We use industry-standard encryption to protect your data both in transit and at rest.",
    },
    {
      q: "Will you delete my data?",
      a: "We do not store your personal data beyond email and username.",
    },
    {
      q: "Can I edit my schedule after uploading?",
      a: "Absolutely, you can make changes to your schedule at any time through the assistant.",
    },
    {
      q: "How do I connect my Google Calendar?",
      a: "You can connect your Google Calendar directly by logging into your Google account.",
    },
    {
      q: "What file formats can I upload?",
      a: "You can upload schedules in formats like PDF, DOCX, Images and Plain text.",
    },
  ];

  return (
    <section
      id="faq"
      className=" leading-relaxed max-w-screen-xl mt-[10rem] mx-auto px-4 md:px-8 h-[90vh] justify-center "
    >
      <div className="space-y-3 text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto text-lg">
          Answered all frequently asked questions, Still confused? feel free to
          contact us.
        </p>
      </div>
      <div className="mt-14 max-w-2xl mx-auto">
        {faqsList.map((item, idx) => (
          <FaqsCard key={idx} idx={idx} faqsList={item} />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
