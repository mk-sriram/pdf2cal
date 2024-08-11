import EventCard from "./EventCard";

interface Event {
  summary: string; // Title of the event
  description?: string; // Optional description of the event

  start: {
    dateTime: string; // The start time in RFC3339 format
    timeZone: string; // Optional time zone for the start time
  };

  end: {
    dateTime: string; // The end time in RFC3339 format
    timeZone: string; // Optional time zone for the end time
  };

  recurrence?: string[]; // Optional array of recurrence rules in RRULE format
}

interface EventListProps {
  jsonData: Event[];
  loading: boolean;
}

const EventList: React.FC<EventListProps> = ({ jsonData, loading }) => {
  
  return (
    <div className="flex w-[70%] h-[95%] p-4 justify-center shadow-xl rounded-2xl bg-gray-100">
      <div className="overflow-scroll w-full ">
        <div className="h-screen p-4 pb-36 ">
          {/* fix this any type, you loser  */}
          {loading ? (
            <div className="animate-pulse ">
              {/* Add the number of skeleton loaders equal to the number of event cards you expect */}
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 bg-gray-300 rounded-lg w-[400px]"
                >
                  <div className="h-6 mb-2 bg-gray-400 rounded w-1/2 "></div>
                  <div className="h-6 mb-2 bg-gray-400 rounded w-1/4"></div>
                  <div className="h-6 mb-2 bg-gray-400 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            jsonData.map((event: any, index: any) => (
              <EventCard
                key={index}
                summary={event.summary}
                start={event.start} // Pass the entire start object
                end={event.end} // Pass the entire end object
                description={event.description}
                recurrence={event.recurrence} // Pass recurrence if it exists
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
