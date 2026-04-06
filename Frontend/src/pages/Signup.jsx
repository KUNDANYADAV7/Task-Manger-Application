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
    if (form.name.length < 2)
      return toast.error("Name must be at least 2 characters");

    if (!form.email.trim()) return toast.error("Email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email))
      return toast.error("Invalid email format");

    if (!form.password.trim())
      return toast.error("Password is required");
    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      setBtnLoading(true);
      await signup(form);
      toast.success("Signup successful");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Signup failed");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300 relative overflow-hidden">
  
  <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
  
  <form
    onSubmit={handleSubmit}
    className="relative z-10 bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl w-[90%] max-w-md transform transition-all duration-500 ease-out hover:scale-[1.02] animate-slideInLeft"
  >
    {/* Heading */}
    <h2 className="text-3xl font-bold text-center text-white mb-2">
      Create Account 🚀
    </h2>
    <p className="text-center text-gray-300 mb-8">
      Start managing your tasks
    </p>

    {/* Name */}
    <input
      type="text"
      placeholder="Enter your full name"
      className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all"
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />

    {/* Email */}
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all"
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />

    {/* Password */}
    <input
      type="password"
      placeholder="Enter your password"
      className="w-full mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all"
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />

    {/* Button */}
    <button
      disabled={btnLoading}
      className="w-full bg-blue-600 hover:bg-blue-500 transition duration-300 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-600/30 disabled:opacity-50 flex justify-center items-center active:scale-95"
    >
      {btnLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Signing up...
        </span>
      ) : (
        "Signup"
      )}
    </button>

    {/* Login Link */}
    <p className="text-center text-gray-300 mt-6 text-sm">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
        Login
      </Link>
    </p>
  </form>
</div>
  );
}
