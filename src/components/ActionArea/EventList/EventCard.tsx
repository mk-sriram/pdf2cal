import React from "react";
import { RRule } from "rrule";

interface Event {
  summary: string; // Title of the event
  description?: string; // Optional description of the event
  start: {
    dateTime: string; // The start time in RFC3339 format
    timeZone?: string; // Optional time zone for the start time
  };
  end: {
    dateTime: string; // The end time in RFC3339 format
    timeZone?: string; // Optional time zone for the end time
  };
  recurrence?: string[] | null; // Optional array of recurrence rules in RRULE format
}

interface EventCardProps extends Event {}

const convertRecurrenceToCustomReadable = (rruleStr: string): string => {
  if (!rruleStr) {
    return "Invalid Recurrence Rule";
  }

  try {
    const rule = RRule.fromString(rruleStr);

    // Get the days of the week
    const days = rule.options.byweekday?.map((weekday: any) =>
      weekday.toString().slice(0, 3)
    );

    // Convert the UNTIL date to a readable format (YYYY-MM-DD)
    const untilDate = rule.options.until
      ? rule.options.until.toISOString().split("T")[0]
      : "";

    // Join days with a comma, and add the "till [Date]" part if available
    return `${days.join(", ")}${untilDate ? ", till " + untilDate : ""}`;
  } catch (error) {
    console.error("Error parsing recurrence rule:", error);
    return "Error in Recurrence Rule";
  }
};

const EventCard: React.FC<EventCardProps> = ({
  summary,
  description,
  start,
  end,
  recurrence,
}) => {
  const displayTime = (dateTime: string) => new Date(dateTime).toLocaleString();

  return (
    <div className="dropdown dropdown-bottom dropdown-hover relative">
      <div
        tabIndex={0}
        role="button"
        className="flex flex-row  justify-between w-[90%] p-4 mb-4 bg-white rounded-xl shadow-md space-x-4 hover:bg-gray-50 hover:scale-[1.009] transition-all ease-in-out duration-200"
      >
        <div className="font-semibold text-lg">{summary}</div>
        {recurrence?.[0] ? (
          <div className="text-md text-gray-600">
            {convertRecurrenceToCustomReadable(recurrence[0])}
          </div>
        ) : (
          <div className="flex items-center text-md text-gray-600">
            {`${displayTime(start.dateTime)} - ${displayTime(end.dateTime)}`}
          </div>
        )}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-white rounded-lg shadow-md z-50 w-full p-4"
      >
        <div className="flex flex-col w-full">
          {description && (
            <div className="text-gray-700 mb-2">Description: {description}</div>
          )}
          {start.timeZone && (
            <div className="text-gray-700 mb-2">TimeZone: {start.timeZone}</div>
          )}
          {recurrence && (
            <div className="text-gray-700 mb-2">
              Full Recurrence: {recurrence.join(", ")}
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default EventCard;
