import { CheckCircle, Pencil, Trash2 } from 'lucide-react';

export default function TaskItem({ task, toggleStatus, handleEdit, deleteTask }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 mb-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:justify-between md:items-center transform transition-all duration-300 hover:shadow-md animate-slideInBottom">
      
      {/* TASK INFO */}
      <div className="flex-1">
        <h3 className={`font-semibold text-lg transition duration-300 ${
            task.status === "completed" ? "line-through text-gray-400" : "text-gray-800 dark:text-gray-100"
          }`}>
          {task.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {task.description}
        </p>

        <div className="flex items-center gap-3 mt-2">
          {task.dueDate && (
            <span className="text-xs text-gray-500 dark:text-gray-500">
              Due: {task.dueDate.slice(0, 10)}
            </span>
          )}
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
              task.status === "completed"
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
            }`}>
            {task.status}
          </span>
        </div>
      </div>

      {/* ACTIONS CONTAINER */}
      <div className="flex items-center gap-2 mt-4 md:mt-0 ml-0 md:ml-4">
        
        {/* TOGGLE STATUS BUTTON */}
        <button
          onClick={() => toggleStatus(task)} // Passing the whole task object to update status
          className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all active:scale-95"
          title={task.status === "completed" ? "Mark as Pending" : "Mark as Completed"}
        >
          <CheckCircle
            size={22}
            className={task.status === "completed" ? "text-green-600" : "text-green-400"}
          />
        </button>

        {/* EDIT BUTTON */}
        <button
          onClick={() => handleEdit(task)}
          className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all active:scale-95"
          title="Edit Task"
        >
          <Pencil size={20} className="text-blue-500" />
        </button>

        {/* DELETE BUTTON */}
        <button
          onClick={() => deleteTask(task._id)}
          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95"
          title="Delete Task"
        >
          <Trash2 size={20} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}