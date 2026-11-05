import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin'); // Default Role
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "https://poultry-backend-tgbx.onrender.com";

  // Handle Login Submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    } else {
      alert("Kripya email aur password dono bharein!");
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

  // LOGIN SCREEN WITH 6 ROLES
  if (!isLoggedIn) {
    return (
      <div style={loginContainerStyle}>
        <div style={loginBoxStyle}>
          <h2 style={{ margin: '0 0 5px 0', color: '#1e293b', textAlign: 'center' }}>Poultry ERP Portal</h2>
          <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '13px', textAlign: 'center' }}>
            Multi-Role Broiler Management System
          </p>
          <form onSubmit={handleLogin}>
            
            {/* ROLE SELECTION DROPDOWN */}
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Select Login Role</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                style={inputStyle}
              >
                <option value="Admin">Admin (Full Control)</option>
                <option value="Accountant">Accountant (Finance & Billing)</option>
                <option value="Branch Manager">Branch Manager (Branch Operations)</option>
                <option value="Line Supervisor">Line Supervisor (Farm & Feed Tracking)</option>
                <option value="Salesman">Salesman (Order & Customer Management)</option>
                <option value="Weight Lifting Supervisor">Weight Lifting Supervisor (Catching & Weighing)</option>
              </select>
            </div>

            {/* EMAIL / USERNAME */}
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Email / User ID</label>
              <input
                type="text"
                placeholder="user@poultryerp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            {/* PASSWORD */}
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

            <button type="submit" style={buttonStyle}>Login as {role}</button>
          </form>
        </div>
      </div>
    );
  }

  // ROLE BASED DASHBOARD SCREEN
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      {/* HEADER WITH USER ROLE */}
      <header style={{ backgroundColor: '#1e293b', color: '#fff', padding: '15px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px' }}>Broiler Management System</h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#cbd5e1' }}>
            Logged in as: <strong>{email}</strong> | Role: <span style={roleBadgeStyle}>{role}</span>
          </p>
        </div>
        <button onClick={() => setIsLoggedIn(false)} style={logoutButtonStyle}>Logout</button>
      </header>

      {/* DASHBOARD CONTENT BASED ON ROLE */}
      <main style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          
          <div style={cardStyle}>
            <h3>Current Active Batches</h3>
            <p style={numberStyle}>{batches.length}</p>
          </div>

          <div style={cardStyle}>
            <h3>Backend Link</h3>
            <p style={{ ...numberStyle, color: '#16a34a', fontSize: '18px' }}>Connected ✅</p>
          </div>

          <div style={cardStyle}>
            <h3>Role Access</h3>
            <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#0284c7', margin: '10px 0 0 0' }}>
              {role} Panel Active
            </p>
          </div>

        </div>

        {/* ROLE SPECIFIC DASHBOARD NOTICE */}
        <section style={{ marginTop: '25px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0 }}>{role} Operations Dashboard</h2>
          
          {role === 'Admin' && <p>🔷 Full System Access: All branches, financial statements, and supervisor controls enabled.</p>}
          {role === 'Accountant' && <p>🔷 Finance View: Invoice generation, payment collections, and expense ledgers.</p>}
          {role === 'Branch Manager' && <p>🔷 Branch Control: Local farm placements, feed stock distribution, and daily mortality tracking.</p>}
          {role === 'Line Supervisor' && <p>🔷 Field View: Daily farm logs, chick mortality entry, feed consumption & medicine updates.</p>}
          {role === 'Salesman' && <p>🔷 Sales View: Customer bird bookings, daily rate updates, and vehicle dispatching.</p>}
          {role === 'Weight Lifting Supervisor' && <p>🔷 Lifting View: Bird catching logs, net vs gross weight measurement, and coop counts.</p>}

        </section>

        {/* DATA TABLE */}
        <section style={{ marginTop: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3>Placement & Flock Records</h3>
          {loading ? (
            <p>Data load ho raha hai...</p>
          ) : batches.length === 0 ? (
            <p>Koi placement data nahi mila (Backend connected is live).</p>
          ) : (
            <ul>
              {batches.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

// STYLES
const loginContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#0f172a',
  fontFamily: 'Arial, sans-serif'
};

const loginBoxStyle = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  width: '100%',
  maxWidth: '400px'
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 'bold',
  color: '#334155',
  marginBottom: '5px'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  boxSizing: 'border-box',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '14px',
  outline: 'none'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  fontSize: '15px',
  cursor: 'pointer',
  marginTop: '5px'
};

const logoutButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#ef4444',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const roleBadgeStyle = {
  backgroundColor: '#3b82f6',
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '12px'
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  textAlign: 'center'
};

const numberStyle = {
  fontSize: '26px',
  fontWeight: 'bold',
  color: '#2563eb',
  margin: '10px 0 0 0'
};

export default App;
