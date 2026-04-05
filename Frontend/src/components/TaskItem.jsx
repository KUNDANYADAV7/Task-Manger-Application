export default function TaskItem({
  task,
  toggleStatus,
  handleEdit,
  deleteTask,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 mb-4 rounded-xl shadow-md flex flex-col md:flex-row md:justify-between md:items-center transition">
      
      <div>
        <h3
          className={`font-semibold text-lg ${
            task.status === "completed" &&
            "line-through text-gray-400"
          }`}
        >
          {task.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {task.description}
        </p>

        {task.dueDate && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Due: {task.dueDate.slice(0, 10)}
          </p>
        )}

        <span
          className={`inline-block mt-1 text-xs px-2 py-1 rounded ${
            task.status === "completed"
              ? "bg-green-200 text-green-700"
              : "bg-yellow-200 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

       {/* ACTIONS */}
      <div className="flex gap-2 mt-3 md:mt-0">
        
        <button
          onClick={() => toggleStatus(task)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
        >
          ✓
        </button>

        <button
          onClick={() => handleEdit(task)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTask(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}