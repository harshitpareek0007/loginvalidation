import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      console.log(form)
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 p-6 shadow rounded">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full border p-2 mb-3"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-500 text-white w-full p-2">
          Login
        </button>
        <p className="mt-2 text-sm">
          New user? <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
