import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <style>{`
        /* Global font imports */
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        /* Base global styles */
        body {
          margin: 0;
          background: #0a0a0f;
          color: #f8fafc;
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .app-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Glassmorphism Navbar */
        .app-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(10, 10, 15, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .brand:hover {
          opacity: 0.8;
        }

        .brand-logo {
          width: 32px; 
          height: 32px;
          background: linear-gradient(135deg, #22c55e, #10b981);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(34,197,94,0.25);
        }

        .brand-logo svg { 
          width: 16px; 
          height: 16px; 
          stroke: white; 
        }

        .brand-text {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #f8fafc;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      `}</style>

      <div className="app-root">
        <header className="app-header">
          
          <Link to="/" className="brand">
            <div className="brand-logo">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
            <span className="brand-text">ProjectFlow</span>
          </Link>
          
          <div></div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />

            <Route
              path="/projects/:projectId"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;