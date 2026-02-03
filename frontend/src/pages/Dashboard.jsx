import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

try{
  const value=localStorage.getItem(token.name)
  console.log(form)
  console.log(value);}catch(err){
    console.log("error")
  }
  
  
  useEffect(() => {
    api.get("/me").then(res => setUser(res.data));
    fetchTasks();
    console.log(user)
  }, []);


  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h2 className="text-xl">Welcome, {user.name}</h2>
        <button onClick={logout} className="text-red-500">Logout</button>
      </div>

      <div className="mt-6">
        <input
          className="border p-2 mr-2"
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2">
          Add
        </button>
      </div>

      <ul className="mt-4">
        {tasks.map(task => (
          <li key={task._id} className="flex justify-between border p-2 mb-2">
            {task.title}
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
