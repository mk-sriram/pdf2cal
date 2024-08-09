import EventCard from "./EventCard";

interface Event {
  summary: string;
  start: string;
  end: string;
  description: string;
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
                start={new Date(event.start.dateTime).toLocaleString("en-US", {
                  timeZone: event.start.timeZone,
                })}
                end={new Date(event.end.dateTime).toLocaleString("en-US", {
                  timeZone: event.end.timeZone,
                })}
                description={event.description}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
