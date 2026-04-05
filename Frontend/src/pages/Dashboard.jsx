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

  const handleSubmit = async () => {
    if (!form.title.trim()) return toast.error("Title is required");
    if (!form.description.trim()) return toast.error("Description is required");
    if (!form.dueDate) return toast.error("Due date is required");

    try {
      setBtnLoading(true);
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
      setBtnLoading(false);
    }
  };

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

      <div className="relative min-h-screen text-black dark:text-white">
        {/* Background image with blur */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[1.2px]"
          style={{ backgroundImage: "url('/todo.jpeg')" }}
        ></div>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/70 dark:bg-black/50"></div>

        {/* Foreground content */}
        <div className="relative p-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center animate-slideInBottom">
              Todo App
            </h2>

            <TaskForm
              form={form}
              setForm={setForm}
              handleSubmit={handleSubmit}
              editId={editId}
              btnLoading={btnLoading}
            />

            {tasks.length === 0 && (
              <p className="text-center text-gray-700 dark:text-gray-300 mt-5 animate-slideInBottom">
                No tasks yet 🚀
              </p>
            )}

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
      </div>
    </>
  );
}
