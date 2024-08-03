import React from "react";

interface EventCardProps {
  summary: string;
  start: Date;
  end: Date;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({
  summary,
  start,
  end,
  description,
}) => {
  return (
    <div className="flex flex-col w-full p-4 mb-4 bg-white rounded-lg shadow-md">
      <div className="font-semibold text-lg mb-2">{summary}</div>
      <div className="text-sm text-gray-500 mb-2">
        {new Date(start.dateTime).toLocaleString()} -{" "}
        {new Date(end.dateTime).toLocaleString()}
      </div>
      <div className="text-gray-700">{description}</div>
    </div>
  );
};
