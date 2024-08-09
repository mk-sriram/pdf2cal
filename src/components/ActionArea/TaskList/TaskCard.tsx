import React from "react";

interface Task {
  title: string; // The title of the task. This is the only required field when creating a task.
  due?: string; // The due date/time of the task in RFC 3339 format. This can be useful if you want to set a deadline for the task.
  notes?: string; // Any additional notes or details about the task.
  status?: "needsAction"; // The status of the task, e.g., 'needsAction' for pending tasks or 'completed' for finished tasks. Defaults to 'needsAction'.
  links?: Array<{
    type: string; // The type of the link, such as 'related' or 'attachment'.
    description?: string; // A brief description of what the link is or why it's relevant.
    link: string; // The URL of the resource being linked to.
  }>;
}

interface TaskCardProps extends Task {}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  due,
  notes,
  status,
  links,
}) => {
  return (
    <div className="flex flex-col w-full p-4 mb-4 bg-white rounded-lg shadow-md">
      <div className="font-semibold text-lg mb-2">{title}</div>
      {due && (
        <div className="text-sm text-gray-500 mb-2">
          Due: {new Date(due).toLocaleString()}
        </div>
      )}
      <div className="text-sm text-gray-500 mb-2">Status: {status}</div>
      {notes && <div className="text-gray-700 mb-2">Notes: {notes}</div>}
      {links && links.length > 0 && (
        <div className="text-gray-700">
          <div className="font-semibold mb-1">Links:</div>
          <ul className="list-disc pl-5">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {link.description
                    ? `${link.description} (${link.type})`
                    : link.link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
