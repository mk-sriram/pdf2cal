//Chat PROMPTS
export const getChatTaskPrompt = () => {
  const currentYear = new Date().getFullYear();

  return `JSON schema: { 
    "title": "The title of the task. This is the only REQUIRED field when creating a task.",
    "due": "The due date/time of the task. Always in RFC 3339 timestamp format. also if year is not available, you should use ${currentYear} for year",
    "notes": "Any additional notes or details about the task.",
    "status": "Set to 'needsAction' by default as all tasks should be incomplete.",
    "links": [
      { 
        "type": "The type of the link, such as 'email' or 'attachment'.",
        "description": "A brief description of what the link is or why it's relevant.",
        "link": "The URL of the resource being linked to."
      }
    ]
  }
Instructions:
1. Do not change the structure of the JSON and Always follow the SCHEMA.
2. Always format dates in RFC 3339 timestamp format, regardless of how they are provided.
3. Only modify the JSON according to the user's instructions.

Ensure that the output always adheres to the provided JSON structure and date format.`;
};

export const getChatEventPrompt = () => {
  return `JSON schema: 
  {
     "summary": "Title of the event",
     "description": "Description of the event. Can contain HTML. Optional",
     "start": {
       "dateTime": "The start time in RFC3339 format",
       "timeZone": "The time zone for the start time"
     },
     "end": {
       "dateTime": "The end time in RFC3339 format",
       "timeZone": "The time zone for the end time"
     },
     "recurrence": [
       "Recurrence as per iCalendar rules. Optional"
     ]
   }


Recurrence rule using the iCalendar format (RRULE). The RRULE should specify the frequency (FREQ), days of the week (BYDAY), intervals (INTERVAL), and any end conditions (UNTIL or COUNT) as described in the iCalendar standard. 
For example:
1. "Every other Thursday until the end of the year" -> RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TH;UNTIL=20231231T235959Z
2. "Daily stand-up for 10 days" - RRULE:FREQ=DAILY;COUNT=10
If multiple identical events (same name, time, details) occur on different dates but share the same time, merge them into a single event. Create a recurrence rule that includes all relevant days of the week (using BYDAY) corresponding to the provided dates.
When events like 'EECS 215 - 002 Lecture' repeat on different days but are otherwise identical, consolidate them into a single recurring event and ensure that the recurrence rule includes all relevant days (e.g., both Monday and Tuesday).

Instructions:
1. Do not change the structure of the JSON and Always follow the SCHEMA.
2. Always format dates in RFC 3339 timestamp format, regardless of how they are provided.
3. Only modify the JSON according to the user's instructions.
4. Extract the correct day of the week from the 'start.dateTime' field to ensure accurate recurrence.
Ensure that the output always adheres to the provided JSON structure and date format.
5.When creating recurrence rules, extract the correct day of the week from the start date provided in the 'start.dateTime' field. Ensure that the RRULE accurately reflects the day on which the event actually occurs.
For example:
1. If an event starts on "2024-08-14T10:00:00-05:00", set the recurrence to repeat on the day that corresponds to August 14th, 2024, which is Wednesday: RRULE:FREQ=WEEKLY;BYDAY=WE;UNTIL=20241231T235959Z.
2. If an event spans multiple specific days, include all relevant days of the week in the RRULE (using BYDAY).
If user requests in the chat for recurrence, abide by these rules:
`;
};
