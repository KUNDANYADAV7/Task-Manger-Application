import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { dark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white shadow px-3 sm:px-4 py-3 flex justify-between items-center transition">
      
      {/* Left */}
      <h1 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
        Todo App
      </h1>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <div className="flex flex-col leading-tight">
          <p className="text-xs sm:text-sm font-semibold">
            {user?.name}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-300 break-all max-w-[120px] sm:max-w-none">
            {user?.email}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}