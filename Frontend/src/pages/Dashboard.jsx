import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
  const { tasks, addTask, updateTask, deleteTask, toggleStatus } = useContext(TaskContext);
  const [btnLoading, setBtnLoading] = useState(false);

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
      setBtnLoading(true);   // start loading
      if (editId) {
        await updateTask(editId, form);
        setEditId(null);
      } else {
        await addTask(form);
      }

      setForm({ title: "", description: "", dueDate: "" });
    } catch {
      toast.error("Something went wrong");
    } finally {
    setBtnLoading(false);  // stop loading
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
          <TaskForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            editId={editId}
            btnLoading={btnLoading}
          />

          {/* EMPTY STATE */}
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-5">
              No tasks yet 🚀
            </p>
          )}

          {/* TASK LIST */}
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              toggleStatus={toggleStatus}
              handleEdit={handleEdit}
              deleteTask={deleteTask}
            />
          ))}

        </div>
      </div>
    </>
  );
}