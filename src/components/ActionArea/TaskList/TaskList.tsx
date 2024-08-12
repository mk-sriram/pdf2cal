import React from "react";
import TaskCard from "./TaskCard"; // Assuming TaskCard is in the same directory

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

interface TaskListProps {
  jsonData: Task[];
  loading: boolean;
  onDeleteTask: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ jsonData, loading, onDeleteTask }) => {
  return (
    <div className="flex flex-col w-[70%] h-[95%] p-4 justify-center shadow-xl rounded-2xl bg-gray-100 relative">
      <div className="overflow-scroll w-full ">
        <div className="flex flex-col h-screen p-4 pb-36 ">
          {loading ? (
            <div className="animate-pulse">
              {/* Add the number of skeleton loaders equal to the number of task cards you expect */}
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  role="button"
                  className="flex flex-row justify-between w-[90%] p-4 mb-4 bg-gray-200 rounded-xl shadow-md space-x-4 animate-pulse"
                >
                  <div className="font-semibold text-lg w-3/5 bg-gray-300 h-6 rounded-md"></div>
                  <div className="flex items-center text-md text-gray-200 w-1/4 bg-gray-300 h-6 rounded-md"></div>
                </div>
              ))}
            </div>
          ) : (
            jsonData.map((task: Task, index: number) => (
              <TaskCard
                key={index}
                taskNumber={index + 1}
                title={task.title}
                due={task.due}
                notes={task.notes}
                status={task.status}
                links={task.links}
                onDelete={() => onDeleteTask(index)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
