export const prompt = `"Please extract calendar events from this file. Format the response as a JSON array of events, where each event in this format shown [
    {
      summary: <NAMEofEvent>,
      description: "Description",
      start: {
        dateTime: entersta",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2024-08-01T10:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    },`;
