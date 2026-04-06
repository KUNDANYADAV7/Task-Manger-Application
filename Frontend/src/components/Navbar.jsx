import { Sun, Moon, LogOut, User } from "lucide-react";
import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const { dark, toggleTheme } = useContext(ThemeContext);

  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef();

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClick = (e) => {
      if (!profileRef.current?.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // LOGOUT HANDLER (from first code)
  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
      
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
          Task<span className="text-blue-600">Flow</span>
        </h1>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* 🌙 THEME (from first code logic) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {dark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-white" />
            )}
          </button>

          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="p-2 rounded-full dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <User className="w-5 h-5" />
            </button>

            {/* DROPDOWN */}
            <AnimatePresence>
              {openProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 
                  rounded-xl shadow-xl border dark:border-gray-700 p-3 space-y-2"
                >

                  {/* USER INFO */}
                  <div className="border-b pb-2 dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {user?.name || "User"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                      {user?.email || "email@example.com"}
                    </p>
                  </div>

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg 
                    hover:bg-red-100 dark:hover:bg-red-900/40 
                    text-red-500 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </nav>
  );
}