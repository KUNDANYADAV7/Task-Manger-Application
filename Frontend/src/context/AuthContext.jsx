import { createContext, useEffect, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);   // store full user
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);  // always stop loading
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data) => {
    await API.post("/auth/login", data);

    // immediately fetch user
    const res = await API.get("/auth/me");
    setUser(res.data);
  };

  const signup = async (data) => {
    await API.post("/auth/signup", data);
  };

  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};