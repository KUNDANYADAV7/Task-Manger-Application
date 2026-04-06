import { createContext, useState, useEffect, useContext } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext"; 

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext); // get user

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setTasks([]);
    }
  };

  // IMPORTANT FIX
  useEffect(() => {
    if (user) {
      fetchTasks(); // login → fetch tasks
    } else {
      setTasks([]); // logout → clear tasks
    }
  }, [user]);

  const addTask = async (form) => {
    await API.post("/tasks", form);
    fetchTasks();
  };

  const updateTask = async (id, form) => {
    await API.put(`/tasks/${id}`, form);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    toast.success("Deleted");
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    fetchTasks();
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
};
