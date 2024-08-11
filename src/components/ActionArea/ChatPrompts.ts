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
  return `JSON schema: { 
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
         recurrence as per icalendar rules Optional"
       ]
     }
  }

If user requests in the chat for recurrence, abide by these:
Recurrence rule using the iCalendar format (RRULE). The RRULE should specify the frequency (FREQ), days of the week (BYDAY), intervals (INTERVAL), and any end conditions (UNTIL or COUNT) as described in the iCalendar standard.
If you see events that are identical and seem to repeat, use the recurrence to just have one instance of it. If an event happens more than once in a week  ( same event name ) then use recurrence. 
For example:
1. "Every other Thursday until the end of the year" -> RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TH;UNTIL=20231231T235959Z
2. "Daily stand-up for 10 days" - RRULE:FREQ=DAILY;COUNT=10
3. "On the 1st and 15th of every month" -> RRULE:FREQ=MONTHLY;BYMONTHDAY=1,15

Instructions:
1. Do not change the structure of the JSON and Always follow the SCHEMA.
2. Always format dates in RFC 3339 timestamp format, regardless of how they are provided.
3. Only modify the JSON according to the user's instructions.

Ensure that the output always adheres to the provided JSON structure and date format.`;
};
