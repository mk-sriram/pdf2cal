import React from "react";
import { RRule, Weekday } from "rrule";

interface Event {
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  recurrence?: string[] | null;
}

interface EventCardProps extends Event {}

const convertRecurrenceToCustomReadable = (rruleStr: string): string => {
  if (!rruleStr) {
    return "Invalid Recurrence Rule";
  }

  try {
    const rule = RRule.fromString(rruleStr);
    const freq = rule.options.freq;
    const interval = rule.options.interval || 1;
    const days = rule.options.byweekday;
    const untilDate = rule.options.until
      ? rule.options.until.toISOString().split("T")[0]
      : "";

    let readableString = "";

    // Determine frequency
    if (freq === RRule.WEEKLY) {
      readableString += interval === 1 ? "Weekly" : `Every ${interval} weeks`;
    } else if (freq === RRule.DAILY) {
      readableString += interval === 1 ? "Daily" : `Every ${interval} days`;
    } else if (freq === RRule.MONTHLY) {
      readableString += interval === 1 ? "Monthly" : `Every ${interval} months`;
    } else if (freq === RRule.YEARLY) {
      readableString += interval === 1 ? "Yearly" : `Every ${interval} years`;
    }

    // Add days of the week
    if (days && days.length > 0) {
      const dayNames = days.map(
        (day: number) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][day]
      );
      readableString += ` on ${dayNames.join(", ")}`;
    }

    // Add until date
    if (untilDate) {
      readableString += `, till ${untilDate}`;
    }

    return readableString;
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
  function displayDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return `${date.toLocaleDateString("en-US")} ${date.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;
  }

  function displayTime(dateTime: string): string {
    const date = new Date(dateTime);
    return `${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  return (
    <div className="dropdown dropdown-bottom dropdown-hover relative">
      <div
        tabIndex={0}
        role="button"
        className="flex flex-col items-start w-[30rem] p-4 mb-2 bg-white rounded-xl shadow-md space-y-1 hover:bg-gray-50 hover:scale-[1.009] transition-all ease-in-out duration-200"
      >
        <div className="font-semibold text-lg">{summary}</div>

        <div className="flex flex-col justify-start text-sm text-gray-600">
          {recurrence?.[0] ? (
            <>
              <div className="mb-2">
                {displayTime(start.dateTime)} - {displayTime(end.dateTime)}
              </div>
              <div className="mb-2">
                Repeats : {convertRecurrenceToCustomReadable(recurrence[0])}
              </div>
            </>
          ) : (
            <div>
              {displayDateTime(start.dateTime)} -{" "}
              {displayDateTime(end.dateTime)}
            </div>
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-[#0b7dffd4] backdrop-blur-md rounded-lg shadow-md z-50 w-[25rem] p-4 left-8"
      >
        <div className="flex flex-col w-full text-white">
          {description && (
            <div className="mb-2">Description: {description}</div>
          )}
          {start.timeZone && (
            <div className="mb-2">TimeZone: {start.timeZone}</div>
          )}
          {!recurrence?.[0] && <div className="mb-2">Non recurring Event</div>}
        </div>
      </ul>
    </div>
  );
};

export default EventCard;
