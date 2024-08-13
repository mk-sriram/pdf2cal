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

interface EventCardProps extends Event {
  onDelete: () => void;
}

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
  onDelete,
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
    <div className="dropdown dropdown-bottom dropdown-hover relative  w-full ">
      <div
        tabIndex={0}
        role="button"
        className="flex flex-col items-start  p-4 mb-2 bg-white rounded-xl shadow-md space-y-1 hover:bg-gray-50 hover:scale-[1.009] transition-all ease-in-out duration-200"
      >
        <div className="flex flex-row items-center justify-between font-semibold text-lg w-full">
          {summary}{" "}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="flex p-1 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="16"
              height="16"
            >
              <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
            </svg>
          </button>
        </div>

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
        className="dropdown-content menu bg-gray-200 border border-gray-200 rounded-lg shadow-md w-full p-4 absolute top-full left-0 z-50 mt-0"
      >
        <div className="flex flex-col w-full text-gray-800 font-medium">
          {description && (
            <div className="mb-2">Description: {description}</div>
          )}
          {start.timeZone && (
            <div className="mb-2">TimeZone: {start.timeZone}</div>
          )}
          {!recurrence?.[0] && <div className="mb-2">Non recurring Event</div>}
          {recurrence?.[0] && (
            <div className="mb-2">
              Start Date: {displayDateTime(start.dateTime)} -{" "}
              {displayTime(end.dateTime)}
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default EventCard;
