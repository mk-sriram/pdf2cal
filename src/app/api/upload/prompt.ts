export const prompt = `"Please extract calendar events from this file using tthis JSON schema : 
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
