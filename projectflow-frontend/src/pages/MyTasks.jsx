import { useEffect, useState } from "react";
import api from "../api/api";

function MyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      const res = await api.get("/tasks/my");
      setTasks(res.data);
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to load tasks");
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      fetchMyTasks();
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to update status");
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

        /* Task List */
        .task-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .task-card {
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          max-width: 65%;
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
      `}</style>

      <div className="tasks-root">
        <div className="tasks-container">
          <div className="header">
            <h1 className="header-title">My Tasks</h1>
            <p className="header-subtitle">Tasks assigned directly to you across all projects</p>
          </div>

          <div className="task-list">
            {tasks.length === 0 ? (
              <div className="glass-card empty-state">
                No tasks assigned to you yet.
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

                    {task.projectId && (
                      <p className="assignee-text">
                        Project: {task.projectId.title}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyTasks;