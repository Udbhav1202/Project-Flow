import { useState } from "react";
import api from "../api/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/users/register", { name, email, password });
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#6366f1", "#22c55e"][strength];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
          padding: 24px;
        }

        .reg-root::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%);
          top: -150px; right: -100px;
          pointer-events: none;
        }

        .reg-root::after {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
          bottom: -100px; left: -100px;
          pointer-events: none;
        }

        .reg-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px 40px;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 32px 64px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.08);
          animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .reg-logo {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #22c55e, #10b981);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
          box-shadow: 0 8px 24px rgba(34,197,94,0.35);
        }

        .reg-logo svg { width: 22px; height: 22px; stroke: white; }

        .reg-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }

        .reg-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          font-weight: 300;
          margin-bottom: 36px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .field-wrapper {
          animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .field-wrapper:nth-child(1) { animation-delay: 0.08s; }
        .field-wrapper:nth-child(2) { animation-delay: 0.14s; }
        .field-wrapper:nth-child(3) { animation-delay: 0.20s; }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .field-input-wrap { position: relative; }

        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.25);
          pointer-events: none;
          width: 16px; height: 16px;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 13px 14px 13px 40px;
          color: #f1f5f9;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .field-input::placeholder { color: rgba(255,255,255,0.2); }

        .field-input:focus {
          border-color: rgba(34,197,94,0.5);
          background: rgba(34,197,94,0.06);
          box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
        }

        .toggle-pw {
          position: absolute;
          right: 13px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.25);
          padding: 2px;
          display: flex; align-items: center;
          transition: color 0.2s;
        }
        .toggle-pw:hover { color: rgba(255,255,255,0.5); }

        /* Password strength */
        .strength-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }

        .strength-bars {
          display: flex;
          gap: 4px;
          flex: 1;
        }

        .strength-bar {
          flex: 1;
          height: 3px;
          border-radius: 99px;
          background: rgba(255,255,255,0.08);
          transition: background 0.3s;
        }

        .strength-label {
          font-size: 11px;
          font-weight: 500;
          min-width: 36px;
          text-align: right;
          transition: color 0.3s;
        }

        /* Steps indicator */
        .steps {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 32px;
          animation: fadeUp 0.6s 0.05s cubic-bezier(0.16,1,0.3,1) both;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(255,255,255,0.25);
        }

        .step-dot {
          width: 20px; height: 20px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          transition: all 0.2s;
        }

        .step.active .step-dot {
          background: linear-gradient(135deg,#22c55e,#10b981);
          border-color: transparent;
          color: white;
          box-shadow: 0 2px 10px rgba(34,197,94,0.4);
        }

        .step.active { color: rgba(255,255,255,0.6); }

        .step-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }

        /* Submit button */
        .reg-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #22c55e, #10b981);
          border: none;
          border-radius: 12px;
          color: white;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 8px 24px rgba(34,197,94,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          animation: fadeUp 0.6s 0.26s cubic-bezier(0.16,1,0.3,1) both;
        }

        .reg-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(34,197,94,0.4);
        }

        .reg-btn:active:not(:disabled) { transform: translateY(0); }
        .reg-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
          animation: fadeUp 0.6s 0.30s cubic-bezier(0.16,1,0.3,1) both;
        }

        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .divider-text { font-size: 12px; color: rgba(255,255,255,0.2); }

        .login-prompt {
          text-align: center;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          animation: fadeUp 0.6s 0.34s cubic-bezier(0.16,1,0.3,1) both;
        }

        .login-link {
          color: #4ade80;
          font-weight: 500;
          cursor: pointer;
          background: none; border: none;
          font-family: inherit; font-size: inherit;
          padding: 0;
          transition: color 0.2s;
        }
        .login-link:hover { color: #86efac; text-decoration: underline; }
      `}</style>

      <div className="reg-root">
        <div className="reg-card">

          <div className="reg-logo">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
          </div>

          <h1 className="reg-title">Create account</h1>
          <p className="reg-subtitle">Start managing your workflow today</p>

          <div className="steps">
            <div className="step active"><div className="step-dot">1</div><span>Account</span></div>
            <div className="step-line" />
            <div className="step"><div className="step-dot">2</div><span>Workspace</span></div>
            <div className="step-line" />
            <div className="step"><div className="step-dot">3</div><span>Done</span></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field-group">

              <div className="field-wrapper">
                <label className="field-label">Full name</label>
                <div className="field-input-wrap">
                  <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input
                    className="field-input"
                    placeholder="Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    autoFocus
                  />
                </div>
              </div>

              <div className="field-wrapper">
                <label className="field-label">Email address</label>
                <div className="field-input-wrap">
                  <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-10 7L2 7"/>
                  </svg>
                  <input
                    className="field-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="field-wrapper">
                <label className="field-label">Password</label>
                <div className="field-input-wrap">
                  <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    className="field-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password"
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>

                {password && (
                  <div className="strength-row">
                    <div className="strength-bars">
                      {[1,2,3,4].map(i => (
                        <div
                          key={i}
                          className="strength-bar"
                          style={{ background: i <= strength ? strengthColor : undefined }}
                        />
                      ))}
                    </div>
                    <span className="strength-label" style={{ color: strengthColor }}>
                      {strengthLabel}
                    </span>
                  </div>
                )}
              </div>

            </div>

            <button type="submit" className="reg-btn" disabled={loading}>
              {loading
                ? <><div className="spinner" /> Creating account…</>
                : "Create account →"}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">Have an account?</span>
            <div className="divider-line" />
          </div>

          <p className="login-prompt">
            Already registered?{" "}
            <button className="login-link" onClick={() => (window.location.href = "/login")}>
              Sign in
            </button>
          </p>

        </div>
      </div>
    </>
  );
}

export default Register;