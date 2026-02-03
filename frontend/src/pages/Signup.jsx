import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/signup", form);
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 p-6 shadow rounded">
        <h2 className="text-2xl mb-4">Signup</h2>
        <input
          className="w-full border p-2 mb-3"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <button className="bg-green-500 text-white w-full p-2">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
