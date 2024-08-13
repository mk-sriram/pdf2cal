import React from "react";

interface Task {
  title: string;
  due?: string;
  notes?: string;
  status?: "needsAction";
  links?: Array<{
    type: string;
    description?: string;
    link: string;
  }>;
}

interface TaskCardProps extends Task {
  taskNumber: number;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  taskNumber,
  title,
  due,
  notes,
  status,
  links,
  onDelete,
}) => {
  return (
    <div className="dropdown dropdown-hover w-full mb-3">
      <div className="flex flex-row justify-between items-center py-3 px-4 rounded-xl shadow-md space-x-2 hover:bg-gray-50 transition-all ease-in-out duration-200 bg-white">
        <div
          tabIndex={0}
          role="button"
          className="flex flex-row justify-between items-center w-full"
        >
          <div className="font-semibold text-lg flex-grow">{`${taskNumber}. ${title}`}</div>
          {due && (
            <div className="flex-shrink-0 text-md text-gray-600">
              {new Date(due).toLocaleDateString()}
            </div>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex-shrink-0 p-1 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="16"
            height="16"
          >
            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
          </svg>
        </button>
      </div>
      {/* Dropdown content */}
      <div
        tabIndex={0}
        className="dropdown-content menu bg-white border border-gray-200 rounded-lg shadow-md w-full p-4 absolute top-full left-0 z-50 mt-1"
      >
        <div className="flex flex-col w-full">
          {notes && <div className="text-gray-700 mb-2">{notes}</div>}
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
      </div>
    </div>
  );
};

export default TaskCard;
