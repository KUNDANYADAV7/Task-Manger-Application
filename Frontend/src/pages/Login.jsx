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
    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters");

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
<div className="relative flex justify-center items-center h-screen overflow-hidden bg-gray-300">
  {/* BACKGROUND LAYER */}
  <div 
    className="absolute inset-0 bg-cover bg-center -z-10" 
  >
    {/* Dark overlay to make the glass effect visible */}
    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
  </div>

  {/* LOGIN FORM (MATCHES SIGNUP DARK GLASS) */}
  <form
    onSubmit={handleSubmit}
    className="bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl w-[90%] max-w-sm transform transition-all duration-500 ease-out hover:scale-[1.02] animate-slideInLeft"
  >
    {/* Heading */}
    <h2 className="text-3xl font-bold text-center text-white mb-2">
      Welcome Back 👋
    </h2>
    <p className="text-center text-gray-300 mb-8 text-sm">
      Login to your account
    </p>

    {/* Email */}
    <div className="mb-4">
      <input
        type="email"
        placeholder="Email address"
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all outline-none"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
    </div>

    {/* Password */}
    <div className="mb-6">
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all outline-none"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
    </div>

    {/* Button */}
    <button
      disabled={btnLoading}
      className="w-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-600/30 disabled:opacity-50 active:scale-95 flex justify-center items-center"
    >
      {btnLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Logging in...
        </span>
      ) : (
        "Login"
      )}
    </button>

    {/* Signup Link */}
    <p className="text-center text-gray-300 mt-8 text-sm">
      Don’t have an account?{" "}
      <Link
        to="/signup"
        className="text-blue-400 hover:text-blue-300 font-bold transition-colors underline-offset-4 hover:underline"
      >
        Signup
      </Link>
    </p>
  </form>
</div>
  );
}