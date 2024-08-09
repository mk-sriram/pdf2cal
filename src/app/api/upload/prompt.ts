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


export const taskPrompt = ``;