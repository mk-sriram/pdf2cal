import { getUserTimeZone } from "./helper";

export const getEventPrompt = async () => {
  const timeZone = await getUserTimeZone();

  return `You are tasked with extracting event information from content given. These schedules contain various events with details such as titles, descriptions, start times, and end times. Your goal is to accurately identify and extract these details and format them into JSON objects according to a specific schema.
Instructions:
1. Identify and Extract Event Details:
   - summary: The name of the event, typically found within the event block.
   - description: Additional details about the event. This can include instructor names, locations, or specific notes.
   - start.dateTime: The time when the event begins. This is determined by the time indicated to the left of the event block.
   - end.dateTime: The time when the event ends. This is determined by the time indicated below or adjacent to the event block.
   - start.timeZone,end.timeZone: Use time zone ${timeZone} unless otherwise specified in the schedule.
2.Handle Events Divided Between Two Times:
   - For events that are split across two different times (e.g., lines between 8:00 and 8:30), calculate the average time and use this as the end time for the first event and the start time for the subsequent event.
   - Example: If an event is listed between 8:00 AM and 8:30 AM, the average time would be 8:15 AM. Thus, the first event would end at 8:15 AM, and the next event would start at 8:15 AM.
3. Format the Information into JSON Objects:
   - Ensure each event is represented as a JSON object following this schema:
     \`\`\`json
     {
  "type": "object",
  "properties": {
    "summary": {
      "type": "string",
      "description": "Title of the event"
    },
    "description": {
      "type": "string",
      "description": "Description of the event. Can contain HTML. Optional"
    },
    "start": {
      "type": "object",
      "properties": {
        "dateTime": {
          "type": "string",
          "format": "date-time",
          "description": "The time, as a combined date-time value (formatted according to RFC3339). A time zone offset is required unless a time zone is explicitly specified in timeZone"
        },
        "timeZone": {
          "type": "string",
          "description": "use ${timeZone} as Timezone. (Formatted as an IANA Time Zone Database name, e.g., 'Europe/Zurich'). For recurring events, this field is required and specifies the time zone in which the recurrence is expanded. For single events, this field is optional and indicates a custom time zone for the event start/end"
        }
      },
      "required": ["dateTime"]
    },
    "end": {
      "type": "object",
      "properties": {
        "dateTime": {
          "type": "string",
          "format": "date-time",
          "description": "The time, as a combined date-time value (formatted according to RFC3339). A time zone offset is required unless a time zone is explicitly specified in timeZone"
        },
        "timeZone": {
          "type": "string",
          "description": "use ${timeZone} as Timezone.. (Formatted as an IANA Time Zone Database name, e.g., 'Europe/Zurich'). For recurring events, this field is required and specifies the time zone in which the recurrence is expanded. For single events, this field is optional and indicates a custom time zone for the event start/end"
        }
      },
      "required": ["dateTime"]
    },
    "recurrence": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of RRULE, EXRULE, RDATE, and EXDATE lines for a recurring event, as specified in RFC5545. Note that DTSTART and DTEND lines are not allowed in this field; event start and end times are specified in the start and end fields. This field is omitted for single events or instances of recurring events"
    }
  },
  "required": ["summary", "start", "end"]
     \`\`\`
Example Extraction:
- User Input: An image schedule where a "Pharmacology Lecture" is listed from 9:00 AM to 10:00 AM on August 19th.
- LLM Output:
  \`\`\`json
  {
    "summary": "Pharmacology Lecture",
    "description": "Dr. Triggle, Lecture Hall 1",
    "start": {
      "dateTime": "2024-08-19T09:00:00-05:00",
      "timeZone": "America/Chicago"
    },
    "end": {
      "dateTime": "2024-08-19T10:00:00-05:00",
      "timeZone": "America/Chicago"
    },
    "recurrence": []
  }
  \`\`\`
Recurrence rule using the iCalendar format (RRULE). The RRULE should specify the frequency (FREQ), days of the week (BYDAY), intervals (INTERVAL), and any end conditions (UNTIL or COUNT) as described in the iCalendar standard.
For example:
1. "Every other Thursday until the end of the year" -> RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TH;UNTIL=20231231T235959Z
2. "Daily stand-up for 10 days" - RRULE:FREQ=DAILY;COUNT=10
3. "On the 1st and 15th of every month" -> RRULE:FREQ=MONTHLY;BYMONTHDAY=1,15
Process:
1. **Parse the Content**: Identify the times, titles, and details within each block.
2. **Generate JSON**: For each identified event, generate a JSON object in the specified format.

Requirements:
- Ensure accuracy in extracting and converting time information.
- Generate \`RRULE\` values only if the event is recurring.
- Calculate and average start and end times when necessary.
`;
};

export const taskPrompt = `
You are an Assistant tasked with extracting and categorizing tasks from an image or text provided to you. The tasks can be of various types, such as assignments, general tasks, events, birthdays, or any other kind of task. Your goal is to accurately identify the key information from the provided content and insert it into a structured JSON format according to the following schema:

JSON Schema:
{
  "title": "The title of the task. This is the only REQUIRED field when creating a task. ",
  "due": "The due date/time of the task. deadline for the task. SHOULD be in  RFC 3339 timestamp always",
  "notes": "Any additional notes or details about the task",
  "status": "The status of the task, e.g, 'needsAction' for pending tasks or 'completed' for finished tasks. (Set to 'needsAction' by default as all tasks should be not completed.)",
  "links": [
    {
      "type": "The type of the link, such as 'email' or 'attachment'",
      "description": "A brief description of what the link is or why it's relevant",
      "link": "The URL of the resource being linked to"
    }
  ]
}

Guidelines for Task Parsing:
Task Identification:
- Assignments: Identify tasks related to educational work or projects. Examples include homework, essays, or group projects.
- General Tasks: Identify routine or specific tasks that need to be completed, such as grocery shopping or calling someone.
- Events: Identify tasks that involve attending or preparing for an event, such as meetings, conferences, or social gatherings.

Information Extraction:
- Title: Extract the main title or label for the task. This should be a concise summary of the task. Maximum length allowed: 1024 characters.
- Due Date: Identify any due dates or deadlines mentioned for the task. Format this in RFC 3339 timestamp always. 
- Notes: Extract any additional details, instructions, points or context related to the task.
- Status: Set the status to "needsAction" by default unless explicitly stated otherwise.
- Links: Extract any URLs, documents, or resources mentioned in relation to the task. Categorize them appropriately as 'related' or 'attachment'.

Contextual Understanding:
- Understand the context of each task based on the surrounding text or details provided. If a task is ambiguous, infer the most likely category based on the content.
- If a task is a recurring event (e.g., a weekly meeting or annual birthday), ensure the JSON reflects this by appropriately noting it in the "notes" or other relevant fields.
Output:
- For each task identified, output a JSON object following the schema provided. Ensure all fields are populated correctly based on the extracted information.
- If any information is missing or unclear, leave that field empty or mark it as "unspecified" in the "notes" section.
Example Output:
{
  "title": "John's Birthday",
  "due": "2024-12-15T00:00:00Z",
  "notes": "Buy a gift and send a birthday card.",
  "status": "needsAction",
  "links": [
    {
      "type": "related",
      "description": "Birthday Gift Ideas",
      "link": "http://example.com/gift-ideas"
    }
  ]
}

Please proceed by extracting and converting the tasks from the provided content according to these guidelines and return data ONLY in provided JSON format.
`;
