import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("Name is required");
    if (form.name.length < 2) return toast.error("Name must be at least 2 characters");
    if (!form.email.trim()) return toast.error("Email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return toast.error("Invalid email format");

    if (!form.password.trim()) return toast.error("Password is required");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");

    try {
      setBtnLoading(true);   // start loading
      await signup(form);
      toast.success("Signup successful");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Signup failed");
    } finally {
      setBtnLoading(false);  // stop loading
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-80 transform transition-all duration-500 ease-out hover:scale-105 animate-slideInLeft"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 animate-slideInBottom">
          Signup
        </h2>

        <input
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded transition duration-300 ease-in-out focus:ring-2 focus:ring-green-400 focus:border-green-400 animate-slideInBottom"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded transition duration-300 ease-in-out focus:ring-2 focus:ring-green-400 focus:border-green-400 animate-slideInBottom"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded transition duration-300 ease-in-out focus:ring-2 focus:ring-green-400 focus:border-green-400 animate-slideInBottom"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50 transition-all duration-300 ease-in-out hover:bg-blue-600 active:scale-95 animate-slideInBottom"
          disabled={btnLoading}
        >
          {btnLoading ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Signing up...
            </span>
          ) : (
            "Signup"
          )}
        </button>

        {/* Login Link */}
        <p className="text-sm mt-4 text-center animate-slideInBottom">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-semibold transition duration-300 hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

