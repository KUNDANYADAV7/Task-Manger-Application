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

    if (!form.name.trim()) {
      return toast.error("Name is required");
    }

    if (form.name.length < 2) {
      return toast.error("Name must be at least 2 characters");
    }

    if (!form.email.trim()) {
      return toast.error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return toast.error("Invalid email format");
    }

    if (!form.password.trim()) {
      return toast.error("Password is required");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
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
        className="bg-white p-6 rounded shadow w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

        <input
          placeholder="Name"
          className="w-full mb-3 p-2 border"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-2 border"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50" disabled={btnLoading}>
          {btnLoading ? "Signing up..." : "Signup"}
        </button>

        {/* Login Link */}
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
