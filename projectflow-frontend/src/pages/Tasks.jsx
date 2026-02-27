import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function Tasks() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/${projectId}`);
      setTasks(res.data.tasks);
    } catch {
      alert("Failed to load tasks");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", {
        title,
        projectId,
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
        console.log(err.response?.data);
        alert(err.response?.data?.message || "Failed to create task");
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      fetchTasks(); 
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Tasks</h2>

      <form onSubmit={createTask}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <hr />

      {tasks.map((task) => (
        <div key={task._id}>
          <p>{task.title}</p>

          <select
            value={task.status}
            onChange={(e) => updateStatus(task._id, e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Tasks;