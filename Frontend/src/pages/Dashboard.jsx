import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import toast from "react-hot-toast";
import { Plus, CheckCircle2, Clock, ListTodo } from "lucide-react"; // Icons for stats
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
  const { tasks, addTask, updateTask, deleteTask, toggleStatus } = useContext(TaskContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });
  const [editId, setEditId] = useState(null);

  // --- STATS LOGIC ---
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = totalTasks - completedTasks;

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setForm({ title: "", description: "", dueDate: "" });
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.dueDate) {
      return toast.error("All fields are required");
    }
    try {
      setBtnLoading(true);
      if (editId) {
        await updateTask(editId, form);
      } else {
        await addTask(form);
      }
      closeModal();
      toast.success(editId ? "Task updated!" : "Task added!");
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
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Background Layer */}
      <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/todo.jpeg')" }}>
        <div className="absolute inset-0 bg-white/80 dark:bg-black/70 backdrop-blur-[3px]"></div>
      </div>

      <div className="relative p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          
          {/* HEADER SECTION */}
          <div className="flex flex-row justify-between items-center mb-6 gap-2">
  {/* Left Side: Title */}
  <div className="min-w-0"> {/* min-w-0 prevents text from pushing the button off-screen */}
    <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight truncate">
      Dashboard
    </h2>
    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">
      Manage your daily productivity
    </p>
  </div>

  {/* Right Side: Button (Compact Version) */}
  <button
    onClick={() => setIsModalOpen(true)}
    className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all active:scale-95 font-bold text-xs md:text-sm"
  >
    <Plus size={16} className="md:w-5 md:h-5" />
    <span>New Task</span>
  </button>
</div>

          {/* --- STATS CARDS GRID --- */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white/50 dark:bg-gray-800/50 p-3 md:p-4 rounded-2xl border border-white/20 backdrop-blur-md shadow-sm flex flex-col items-center">
              <ListTodo className="text-blue-500 mb-1" size={20} />
              <span className="text-xl md:text-2xl font-bold dark:text-white">{totalTasks}</span>
              <span className="text-[10px] md:text-xs uppercase font-bold text-gray-500 tracking-wider">Total</span>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 p-3 md:p-4 rounded-2xl border border-white/20 backdrop-blur-md shadow-sm flex flex-col items-center">
              <Clock className="text-yellow-500 mb-1" size={20} />
              <span className="text-xl md:text-2xl font-bold dark:text-white">{pendingTasks}</span>
              <span className="text-[10px] md:text-xs uppercase font-bold text-gray-500 tracking-wider">Pending</span>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 p-3 md:p-4 rounded-2xl border border-white/20 backdrop-blur-md shadow-sm flex flex-col items-center">
              <CheckCircle2 className="text-green-500 mb-1" size={20} />
              <span className="text-xl md:text-2xl font-bold dark:text-white">{completedTasks}</span>
              <span className="text-[10px] md:text-xs uppercase font-bold text-gray-500 tracking-wider">Done</span>
            </div>
          </div>

          {/* TASK LIST SECTION */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-16 bg-white/20 dark:bg-gray-900/20 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700 backdrop-blur-sm">
                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Your list is empty. Add a task to get started! 🚀</p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  toggleStatus={toggleStatus}
                  handleEdit={handleEdit}
                  deleteTask={deleteTask}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODAL SYSTEM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-md">
            <TaskForm
              form={form}
              setForm={setForm}
              handleSubmit={handleSubmit}
              editId={editId}
              btnLoading={btnLoading}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
