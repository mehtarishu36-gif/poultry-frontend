import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const [errorMsg, setErrorMsg] = useState('');
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "https://poultry-backend-tgbx.onrender.com";

  // Real Backend Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoggedIn(true);
      } else {
        setErrorMsg(data.message || 'Login fail ho gaya. Details check karein.');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setErrorMsg('Server se connection nahi ho pa raha hai.');
    }
  };

  // Fetch Dashboard Data after Login
  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${API_URL}/api/placements`)
        .then((res) => res.json())
        .then((data) => {
          setBatches(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Backend Error:", err);
          setLoading(false);
        });
    }
  }, [isLoggedIn, API_URL]);

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div style={loginContainerStyle}>
        <div style={loginBoxStyle}>
          <h2 style={{ margin: '0 0 5px 0', color: '#1e293b', textAlign: 'center' }}>Poultry ERP Portal</h2>
          <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '13px', textAlign: 'center' }}>
            Secure Multi-Role Login
          </p>

          {errorMsg && <div style={errorBoxStyle}>{errorMsg}</div>}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Select Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
                <option value="Admin">Admin</option>
                <option value="Accountant">Accountant</option>
                <option value="Branch Manager">Branch Manager</option>
                <option value="Line Supervisor">Line Supervisor</option>
                <option value="Salesman">Salesman</option>
                <option value="Weight Lifting Supervisor">Weight Lifting Supervisor</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Email / User ID</label>
              <input
                type="email"
                placeholder="admin@poultry.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <button type="submit" style={buttonStyle}>Login to System</button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD SCREEN
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#1e293b', color: '#fff', padding: '15px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px' }}>Broiler Management System</h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#cbd5e1' }}>
            Logged in: <strong>{email}</strong> | Role: <span style={roleBadgeStyle}>{role}</span>
          </p>
        </div>
        <button onClick={() => setIsLoggedIn(false)} style={logoutButtonStyle}>Logout</button>
      </header>

      <main style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <div style={cardStyle}>
            <h3>Current Active Batches</h3>
            <p style={numberStyle}>{batches.length}</p>
          </div>
          <div style={cardStyle}>
            <h3>Backend Status</h3>
            <p style={{ ...numberStyle, color: '#16a34a', fontSize: '18px' }}>Connected ✅</p>
          </div>
        </div>

        <section style={{ marginTop: '25px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0 }}>{role} Operations Dashboard</h2>
          <p>🔷 Welcome to your secure portal. Database connection active.</p>
        </section>
      </main>
    </div>
  );
}

// STYLES
const loginContainerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: 'Arial, sans-serif' };
const loginBoxStyle = { backgroundColor: '#ffffff', padding: '30px', borderRadius: '10px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)', width: '100%', maxWidth: '400px' };
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '5px' };
const inputStyle = { width: '100%', padding: '10px 12px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' };
const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '5px' };
const logoutButtonStyle = { padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const roleBadgeStyle = { backgroundColor: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' };
const cardStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center' };
const numberStyle = { fontSize: '26px', fontWeight: 'bold', color: '#2563eb', margin: '10px 0 0 0' };
const errorBoxStyle = { backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' };

export default App;
