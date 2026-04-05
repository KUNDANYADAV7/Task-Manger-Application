import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { tasks, addTask, updateTask, deleteTask, toggleStatus } =
    useContext(TaskContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [editId, setEditId] = useState(null);

  // Add or Update Task
  const handleSubmit = async () => {
    if (!form.title.trim()) {
      return toast.error("Title is required");
    }

    if (!form.description.trim()) {
      return toast.error("Description is required");
    }

    if (!form.dueDate) {
      return toast.error("Due date is required");
    }

    try {
      if (editId) {
        await updateTask(editId, form);
        setEditId(null);
      } else {
        await addTask(form);
      }

      setForm({ title: "", description: "", dueDate: "" });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Edit
  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate?.slice(0, 10) || "",
    });
    setEditId(task._id);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-5">
        <div className="max-w-2xl mx-auto">

          {/* Heading */}
          <h2 className="text-3xl font-bold mb-6 text-center">
            Todo App
          </h2>

          {/* FORM */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md mb-5 space-y-4">
            
            <input
              placeholder="Title"
              className="w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              placeholder="Description"
              className="w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              type="date"
              className="w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
            />

            <button
              onClick={handleSubmit}
              className={`w-full text-white p-2 rounded transition ${
                editId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {editId ? "Update Task" : "Add Task"}
            </button>
          </div>

          {/* EMPTY STATE */}
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-5">
              No tasks yet 🚀 Add your first task!
            </p>
          )}

          {/* TASK LIST */}
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-900 p-4 mb-4 rounded-xl shadow-md flex flex-col md:flex-row md:justify-between md:items-center transition"
            >
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
          ))}
        </div>
      </div>
    </>
  );
}