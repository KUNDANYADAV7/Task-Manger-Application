import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) return toast.error("Email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return toast.error("Invalid email format");

    if (!form.password.trim()) return toast.error("Password is required");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");

    try {
      setBtnLoading(true);
      await login(form);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-80 transform transition-all duration-500 ease-out hover:scale-105 animate-slideInLeft"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 animate-slideInBottom">
          Login
        </h2>

        <input
          className="w-full mb-3 p-2 border rounded transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:border-blue-400 animate-slideInBottom"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border rounded transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:border-blue-400 animate-slideInBottom"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50 transition-all duration-300 ease-in-out hover:bg-blue-600 active:scale-95 animate-slideInBottom"
          disabled={btnLoading}
        >
          {btnLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm mt-4 text-center animate-slideInBottom">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-semibold transition duration-300 hover:text-blue-700"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
