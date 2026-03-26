import { useEffect, useState } from "react";
import api from "../api/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      alert("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post("/projects", { title, description });
      setTitle("");
      setDescription("");
      setFormOpen(false);
      fetchProjects();
    } catch (err) {
      alert("Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  const colors = [
    "linear-gradient(135deg,#6366f1,#8b5cf6)",
    "linear-gradient(135deg,#ec4899,#f43f5e)",
    "linear-gradient(135deg,#14b8a6,#06b6d4)",
    "linear-gradient(135deg,#f59e0b,#ef4444)",
    "linear-gradient(135deg,#22c55e,#10b981)",
    "linear-gradient(135deg,#3b82f6,#6366f1)",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .proj-root {
          min-height: 100vh;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          color: #f1f5f9;
          padding: 40px 24px 80px;
        }

        .proj-root::before {
          content: '';
          position: fixed;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          top: -200px; left: -200px;
          pointer-events: none;
          z-index: 0;
        }

        .proj-inner {
          position: relative;
          z-index: 1;
          max-width: 960px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .proj-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
          animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        .proj-header-left {}

        .proj-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 6px;
        }

        .proj-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #f8fafc;
        }

        .proj-count {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 500;
          color: #a5b4fc;
          margin-left: 12px;
          vertical-align: middle;
          position: relative;
          top: -4px;
        }

        .new-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          padding: 11px 20px;
          color: white;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 6px 20px rgba(99,102,241,0.35);
          white-space: nowrap;
        }

        .new-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(99,102,241,0.45);
        }

        .new-btn:active { transform: translateY(0); }

        /* ── Create Form Panel ── */
        .form-panel {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 28px 28px 24px;
          margin-bottom: 32px;
          backdrop-filter: blur(16px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
          animation: slideDown 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .form-panel-title {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-panel-title span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          display: inline-block;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        @media (max-width: 580px) {
          .form-row { grid-template-columns: 1fr; }
        }

        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 14px;
          color: #f1f5f9;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .form-input::placeholder { color: rgba(255,255,255,0.2); }

        .form-input:focus {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.07);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        .form-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;
        }

        .btn-create {
          display: flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          color: white;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 4px 16px rgba(99,102,241,0.3);
        }

        .btn-create:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .btn-create:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-cancel {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 10px 16px;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }

        .btn-cancel:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.6); }

        .spinner {
          width: 13px; height: 13px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Grid ── */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 18px;
        }

        /* ── Card ── */
        .proj-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 24px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s;
          animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
          position: relative;
          overflow: hidden;
        }

        .proj-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--card-accent);
          border-radius: 20px 20px 0 0;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .proj-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.5);
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
        }

        .proj-card:hover::before { opacity: 1; }

        .card-avatar {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: var(--card-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.3);
        }

        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .card-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          line-height: 1.5;
          margin-bottom: 20px;
          min-height: 38px;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-tag {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.05);
          border-radius: 6px;
          padding: 3px 8px;
        }

        .card-arrow {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.4);
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }

        .proj-card:hover .card-arrow {
          background: rgba(99,102,241,0.2);
          border-color: rgba(99,102,241,0.3);
          color: #a5b4fc;
          transform: translateX(2px);
        }

        /* ── Empty state ── */
        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 64px 24px;
          animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        .empty-icon {
          width: 56px; height: 56px;
          border-radius: 18px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #818cf8;
        }

        .empty-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: rgba(255,255,255,0.6);
          margin-bottom: 8px;
        }

        .empty-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.25);
        }

        /* ── Skeleton loader ── */
        .skeleton-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 24px;
          animation: pulse 1.6s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .skel-block {
          background: rgba(255,255,255,0.07);
          border-radius: 8px;
          margin-bottom: 12px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="proj-root">
        <div className="proj-inner">

          <div className="proj-header">
            <div className="proj-header-left">
              <p className="proj-eyebrow">Dashboard</p>
              <h1 className="proj-title">
                Projects
                {!loading && (
                  <span className="proj-count">{projects.length}</span>
                )}
              </h1>
            </div>
            <button className="new-btn" onClick={() => setFormOpen(!formOpen)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New Project
            </button>
          </div>

          {formOpen && (
            <div className="form-panel">
              <div className="form-panel-title">
                <span /> New Project
              </div>
              <form onSubmit={handleCreate}>
                <div className="form-row">
                  <input
                    className="form-input"
                    placeholder="Project title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    autoFocus
                  />
                  <input
                    className="form-input"
                    placeholder="Short description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-create" disabled={creating}>
                    {creating ? <><div className="spinner" /> Creating…</> : <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Create Project
                    </>}
                  </button>
                  <button type="button" className="btn-cancel" onClick={() => setFormOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="proj-grid">
            {loading ? (
              [0,1,2,3].map(i => (
                <div className="skeleton-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="skel-block" style={{ width: 40, height: 40, borderRadius: 12, marginBottom: 16 }} />
                  <div className="skel-block" style={{ width: '70%', height: 14 }} />
                  <div className="skel-block" style={{ width: '45%', height: 12 }} />
                  <div className="skel-block" style={{ width: '90%', height: 12 }} />
                </div>
              ))
            ) : projects.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="4"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                </div>
                <p className="empty-title">No projects yet</p>
                <p className="empty-sub">Click "New Project" to create your first one</p>
              </div>
            ) : (
              projects.map((project, i) => {
                const accent = colors[i % colors.length];
                const initial = project.title?.[0]?.toUpperCase() || "P";
                return (
                  <div
                    key={project._id}
                    className="proj-card"
                    style={{ "--card-accent": accent, animationDelay: `${i * 0.06}s` }}
                    onClick={() => (window.location.href = `/projects/${project._id}`)}
                  >
                    <div className="card-avatar">{initial}</div>
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-desc">
                      {project.description || "No description provided."}
                    </p>
                    <div className="card-footer">
                      <span className="card-tag">View tasks →</span>
                      <div className="card-arrow">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                          <polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Projects;