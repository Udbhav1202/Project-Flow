function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .home-root {
          min-height: 100vh;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          color: #f8fafc;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* Giant Background Glows for Landing Page */
        .home-root::before {
          content: '';
          position: absolute;
          width: 800px; height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%);
          top: -200px; right: -200px;
          pointer-events: none;
        }

        .home-root::after {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
          bottom: -150px; left: -150px;
          pointer-events: none;
        }

        /* Navbar */
        .home-nav {
          position: relative;
          z-index: 10;
          padding: 24px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: fadeDown 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .brand-logo {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #22c55e, #10b981);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(34,197,94,0.3);
        }

        .brand-logo svg { width: 18px; height: 18px; stroke: white; }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .nav-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        /* Buttons */
        .btn-ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #f8fafc;
          padding: 10px 20px;
          border-radius: 10px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-ghost:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.2);
        }

        .btn-primary {
          background: linear-gradient(135deg, #22c55e, #10b981);
          border: none;
          color: white;
          padding: 10px 24px;
          border-radius: 10px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(34,197,94,0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(34,197,94,0.4);
        }

        /* Hero Section */
        .hero {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 24px;
          margin-top: -60px; /* Offset for vertical centering */
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: 56px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin-bottom: 24px;
          max-width: 800px;
          background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeUp 0.8s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }

        .hero-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.5);
          max-width: 500px;
          line-height: 1.6;
          margin-bottom: 40px;
          animation: fadeUp 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          animation: fadeUp 0.8s 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }

        .hero-btn-primary {
          background: linear-gradient(135deg, #22c55e, #10b981);
          border: none;
          color: white;
          padding: 16px 32px;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 8px 24px rgba(34,197,94,0.3);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(34,197,94,0.4);
        }

        .hero-btn-secondary {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: #f8fafc;
          padding: 16px 32px;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.2s;
        }

        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="home-root">
        

        <main className="hero">
          <h1 className="hero-title">
            Manage your workflow,<br />beautifully.
          </h1>
          
          <p className="hero-subtitle">
            ProjectFlow helps you organize your work, track tasks, and improve productivity with a simple and powerful system.
          </p>

          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={() => (window.location.href = "/login")}>
              Sign In
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button className="hero-btn-secondary" onClick={() => (window.location.href = "/register")}>
              Create Account
            </button>
          </div>
        </main>

      </div>
    </>
  );
}

export default Home;