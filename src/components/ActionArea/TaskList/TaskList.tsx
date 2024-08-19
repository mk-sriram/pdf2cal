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

const TaskList: React.FC<TaskListProps> = ({
  jsonData,
  loading,
  onDeleteTask,
}) => {
  return (
    <div className="flex flex-col xl:w-[38rem] lg:w-[35rem] md:w-[30rem]  sm:w-[25rem]  h-[95%] p-4 justify-center shadow-xl rounded-2xl bg-[#f3f4f69e] relative">
      <div className="overflow-scroll w-full ">
        <div className="flex flex-col h-screen p-4 pb-36 ">
          {loading ? (
            <div className="animate-pulse ">
              {/* Add the number of skeleton loaders equal to the number of task cards you expect */}
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center w-full py-3 px-4 rounded-xl shadow-md space-x-2 bg-white animate-pulse"
                >
                  <div className="flex-grow">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                  </div>
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
