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
}

const TaskList: React.FC<TaskListProps> = ({ jsonData, loading }) => {
  return (
    <div className="flex flex-row w-[70%] h-[95%] p-4 justify-center shadow-xl rounded-2xl bg-gray-100 relative">
      <div className="overflow-scroll w-full">
        <div className="h-screen p-4 pb-36">
          {loading ? (
            <div className="animate-pulse">
              {/* Add the number of skeleton loaders equal to the number of task cards you expect */}
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 bg-gray-300 rounded-lg w-[400px]"
                >
                  <div className="h-6 mb-2 bg-gray-400 rounded w-1/2 "></div>
                  <div className="h-6 mb-2 bg-gray-400 rounded w-1/4"></div>
                  <div className="h-6 mb-2 bg-gray-400 rounded w-3/4"></div>
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
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
