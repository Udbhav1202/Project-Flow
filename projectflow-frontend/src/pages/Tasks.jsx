import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function Tasks() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [page]);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/${projectId}?page=${page}`);
      console.log("Tasks from database:", res.data.tasks);
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      alert("Failed to load tasks");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await api.post("/tasks", {
        title,
        projectId,
        assignedTo,
        description,
      });
      console.log("Sending assignedTo:", assignedTo);
      setTitle("");
      setAssignedTo(""); 
      setDescription(""); 
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
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

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load users");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tasks-root {
          min-height: 100vh;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          padding: 40px 24px;
          color: #f8fafc;
          overflow-x: hidden;
        }

        .tasks-root::before {
          content: '';
          position: fixed;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%);
          top: -150px; right: -100px;
          pointer-events: none;
        }

        .tasks-root::after {
          content: '';
          position: fixed;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
          bottom: -100px; left: -100px;
          pointer-events: none;
        }

        .tasks-container {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }

        .header {
          margin-bottom: 32px;
          animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        .header-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }

        .header-subtitle {
          font-size: 15px;
          color: rgba(255,255,255,0.4);
          font-weight: 300;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .glass-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          box-shadow: 
            0 0 0 1px rgba(255,255,255,0.02),
            0 16px 32px rgba(0,0,0,0.3);
        }

        /* ----- Add Task Form Refactored Layout ----- */
        .add-task-card {
          padding: 24px;
          margin-bottom: 32px;
          animation: fadeUp 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }

        .add-task-form {
          display: flex;
          flex-direction: column;
          gap: 16px; /* Space between rows */
        }

        .form-row {
          display: flex;
          gap: 12px;
          width: 100%;
        }

        .field-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 20px;
          color: #f1f5f9;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
          transition: all 0.2s;
        }

        .field-input::placeholder { color: rgba(255,255,255,0.2); }
        .field-input:focus {
          border-color: rgba(34,197,94,0.5);
          background: rgba(34,197,94,0.06);
          box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
        }

        .field-textarea {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 20px;
          color: #f1f5f9;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          resize: vertical;
          min-height: 48px; /* Matches input height */
        }

        .field-textarea::placeholder { color: rgba(255,255,255,0.2); }
        .field-textarea:focus {
          border-color: rgba(34,197,94,0.5);
          background: rgba(34,197,94,0.06);
          box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
        }

        .form-select-wrapper {
          position: relative;
          min-width: 160px;
        }

        .form-select {
          width: 100%;
          height: 100%;
          appearance: none;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 10px 36px 10px 16px;
          color: #f1f5f9;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-select:focus { border-color: rgba(34,197,94,0.5); }
        .form-select option { background: #1e1e24; color: #fff; }

        .btn-primary {
          padding: 0 24px;
          background: linear-gradient(135deg, #22c55e, #10b981);
          border: none;
          border-radius: 12px;
          color: white;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 8px 24px rgba(34,197,94,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          white-space: nowrap;
        }

        .btn-primary:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(34,197,94,0.4);
        }
        .btn-primary:active:not(:disabled) { transform: translateY(0); }
        .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

        .btn-secondary {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #f8fafc;
          padding: 0 20px;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          white-space: nowrap;
        }

        .btn-secondary:hover:not(:disabled) {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
        }
        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ----- Task List Layout ----- */
        .task-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .task-card {
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center; /* Changed from center to align description properly */
          transition: transform 0.2s, border-color 0.2s;
          animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        .task-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.15);
        }

        .task-info {
          display: flex;
          flex-direction: column; 
          align-items: flex-start;
          gap: 8px; 
          max-width: 65%; /* Prevents text from pushing into the dropdown */
        }

        .task-title {
          font-size: 16px;
          font-weight: 500;
          color: #f1f5f9;
        }

        .task-description {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          line-height: 1.5;
          margin-bottom: 4px;
        }

        .status-badge {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 10px;
          border-radius: 99px;
          display: inline-flex;
          align-items: center;
          width: fit-content;
        }

        .status-todo {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .status-in-progress {
          background: rgba(245,158,11,0.1);
          color: #fcd34d;
          border: 1px solid rgba(245,158,11,0.2);
        }

        .status-done {
          background: rgba(34,197,94,0.1);
          color: #86efac;
          border: 1px solid rgba(34,197,94,0.2);
        }

        .task-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .assignee-text {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }

        .select-wrapper { position: relative; }

        .status-select {
          appearance: none;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 8px 36px 8px 16px;
          color: #e2e8f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }

        .status-select:focus { border-color: rgba(255,255,255,0.3); }
        .status-select option { background: #1e1e24; color: #fff; }

        .select-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: rgba(255,255,255,0.4);
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: rgba(255,255,255,0.3);
          font-size: 15px;
          animation: fadeUp 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* Pagination Styles */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 32px;
          animation: fadeUp 0.6s 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }

        .btn-pagination {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #f8fafc;
          padding: 8px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-pagination:hover:not(:disabled) {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }

        .btn-pagination:active:not(:disabled) { transform: translateY(0); }
        .btn-pagination:disabled { opacity: 0.3; cursor: not-allowed; }

        .pagination-text {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }
      `}</style>

      <div className="tasks-root">
        <div className="tasks-container">
          <div className="header">
            <h1 className="header-title">Project Tasks</h1>
            <p className="header-subtitle">Manage and track your workflow</p>
          </div>

          <div className="glass-card add-task-card">
            <form onSubmit={createTask} className="add-task-form">
              
              {/* Row 1: Title, User Select, Add Task */}
              <div className="form-row">
                <input
                  className="field-input"
                  placeholder="What needs to be done?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                  >
                    <option value="">Assign User</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  <svg className="select-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? (
                    "Adding..."
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      Add Task
                    </>
                  )}
                </button>
              </div>

              {/* Row 2: Textarea & Generate Button */}
              <div className="form-row">
                <textarea
                  className="field-textarea"
                  placeholder="Task description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button 
                  type="button"
                  className="btn-secondary"
                  disabled={!title.trim()} 
                  onClick={async () => {
                    if (!title.trim()) return;
                    const res = await api.post("/ai/generate", { title });
                    setDescription(res.data.description);
                  }}
                >
                  ✨ Generate Description
                </button>
              </div>

            </form>
          </div>

          <div className="task-list">
            {tasks.length === 0 ? (
              <div className="glass-card empty-state">
                No tasks found. Create one to get started.
              </div>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={task._id}
                  className="glass-card task-card"
                  style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                >
                  <div className="task-info">
                    <p className="task-title">{task.title}</p>
                    
                    {/* Render the description here! */}
                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}

                    <span
                      className={`status-badge ${
                        task.status === "todo"
                          ? "status-todo"
                          : task.status === "in-progress"
                            ? "status-in-progress"
                            : "status-done"
                      }`}
                    >
                      {task.status.replace("-", " ")}
                    </span>
                  </div>

                  <div className="task-actions">
                    <div className="select-wrapper">
                      <select
                        className="status-select"
                        value={task.status}
                        onChange={(e) => updateStatus(task._id, e.target.value)}
                      >
                        <option value="todo">Todo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                      <svg className="select-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>

                    {task.assignedTo && (
                      <p className="assignee-text">
                        Assigned to: {task.assignedTo?.name}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Component */}
          <div className="pagination">
            <button
              className="btn-pagination"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              ← Prev
            </button>

            <span className="pagination-text">
              Page {page} of {totalPages}
            </span>

            <button
              className="btn-pagination"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tasks;