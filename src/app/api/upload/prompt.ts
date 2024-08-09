export const eventPrompt = `"Please extract calendar events from this file using this JSON schema,
each assignment or discussion should be its own event 
Each cell contains information about the lecture name, lecturer (Dr.), and location of the lecture room (LH1 or A10*). The name of the lecture ( not lecturer name )  should be the summary,
some events end in between others, 8 45, 945 etc, make sure you account for those
rest of the information as description, extract the date and time from the picture. This is a schedule: 
   {
  "type": "object",
  "properties": {
    "summary": { "type": "string" },
    "description": { "type": "string" },
    "start": {
      "type": "object",
      "properties": {
        "dateTime": { "type": "string" },
        "timeZone": { "type": "string" }
      },
      "required": ["dateTime", "timeZone"]
    },
    "end": {
      "type": "object",
      "properties": {
        "dateTime": { "type": "string" },
        "timeZone": { "type": "string" }
      },
      "required": ["dateTime", "timeZone"]
    }
  },
  "required": ["summary", "description", "start", "end"]
}`;

export const taskPrompt = `
You are an Assistant tasked with extracting and categorizing tasks from an image or text provided to you. The tasks can be of various types, such as assignments, general tasks, events, birthdays, or any other kind of task. Your goal is to accurately identify the key information from the provided content and insert it into a structured JSON format according to the following schema:

JSON Schema:
{
  "title": "The title of the task. This is the only REQUIRED field when creating a task. ",
  "due": "The due date/time of the task. This can be useful if you want to set a deadline for the task.",
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
- Due Date: Identify any due dates or deadlines mentioned for the task. Format this in a standard date/time format if possible. RFC 3339 timestamp.
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

Please proceed by extracting and converting the tasks from the provided image or text according to these guidelines.
`;
