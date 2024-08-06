"use client";
import React from "react";
import Droparea from "./Droparea";

const ActionArea: React.FC = () => {
  const jsonData = [
    {
      summary: "Team Meeting",
      description: "Discuss project milestones and tasks.",
      start: {
        dateTime: "2024-08-01T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2024-08-01T10:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    },
    {
      summary: "Client Call",
      description: "Weekly sync-up call with the client to review progress.",
      start: {
        dateTime: "2024-08-02T11:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2024-08-02T12:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    },
    {
      summary: "Webinar on Product Launch",
      description: "Join us for an exciting webinar on our new product launch.",
      start: {
        dateTime: "2024-08-03T14:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2024-08-03T15:30:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    },
    {
      summary: "Lunch with Sarah",
      description: "Casual lunch meeting at the local bistro.",
      start: {
        dateTime: "2024-08-04T12:30:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2024-08-04T13:30:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    },
    {
      summary: "Project Deadline",
      description: "Final submission for the quarterly project.",
      start: {
        dateTime: "2024-08-05T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2024-08-05T18:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    },
  ];

  return (
    <div className="relative w-full h-full">
      <Droparea />
    </div>
  );
};

export default ActionArea;
