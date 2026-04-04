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

  //Add or Update Task
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

      <div className="p-5 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Todo App</h2>

        {/* FORM */}
        <div className="bg-white p-4 rounded shadow mb-4 space-y-3">
          <input
            placeholder="Title"
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={form.dueDate}
            onChange={(e) =>
              setForm({ ...form, dueDate: e.target.value })
            }
          />

          <button
            onClick={handleSubmit}
            className={`w-full text-white p-2 rounded ${
              editId ? "bg-yellow-400" : "bg-blue-500"
            }`}
          >
            {editId ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* EMPTY STATE */}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-5">
            No tasks yet 🚀 Add your first task!
          </p>
        )}

        {/* TASK LIST */}
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 mb-3 rounded shadow flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div>
              <h3
                className={`font-semibold ${
                  task.status === "completed" &&
                  "line-through text-gray-400"
                }`}
              >
                {task.title}
              </h3>

              <p className="text-sm text-gray-600">
                {task.description}
              </p>

              {task.dueDate && (
                <p className="text-xs text-gray-500">
                  Due: {task.dueDate.slice(0, 10)}
                </p>
              )}

              <span
                className={`text-xs px-2 py-1 rounded ${
                  task.status === "completed"
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {task.status}
              </span>
            </div>

            <div className="flex gap-2 mt-3 md:mt-0">
              <button
                onClick={() => toggleStatus(task)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                ✓
              </button>

              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-400 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}