import React, { useState, useEffect } from 'react';
import { apiService } from './services/service';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = await apiService.login(email, password);

    if (res.ok && res.success) {
      setIsLoggedIn(true);
      setUserRole(res.user.role);
    } else {
      setErrorMsg(res.message || 'Login failed. Email ya password check karein.');
    }
  };

  // Handle Register Submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = await apiService.register(name, email, password);

    if (res.ok && res.success) {
      setSuccessMsg(res.message);
      setIsRegisterMode(false);
      setPassword('');
    } else {
      setErrorMsg(res.message || 'Registration failed.');
    }
  };

  // Fetch Dashboard Data after Login
  useEffect(() => {
    if (isLoggedIn) {
      apiService.getPlacements().then((data) => {
        setBatches(data);
        setLoading(false);
      });
    }
  }, [isLoggedIn]);

  // LOGIN / REGISTER SCREEN
  if (!isLoggedIn) {
    return (
      <div style={loginContainerStyle}>
        <div style={loginBoxStyle}>
          <h2 style={{ margin: '0 0 5px 0', color: '#1e293b', textAlign: 'center' }}>Poultry ERP Portal</h2>
          <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '13px', textAlign: 'center' }}>
            {isRegisterMode ? 'Create New Account' : 'Broiler Management System Login'}
          </p>

          {errorMsg && <div style={errorBoxStyle}>{errorMsg}</div>}
          {successMsg && <div style={successBoxStyle}>{successMsg}</div>}

          {!isRegisterMode ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Email / User ID</label>
                <input
                  type="email"
                  placeholder="user@poultry.com"
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

              <button type="submit" style={buttonStyle}>Login</button>

              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Naya account chahiye? </span>
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(true); setErrorMsg(''); setSuccessMsg(''); }}
                  style={toggleButtonStyle}
                >
                  Create Account
                </button>
              </div>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  placeholder="Aapka Naam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  placeholder="user@poultry.com"
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

              <button type="submit" style={{ ...buttonStyle, backgroundColor: '#16a34a' }}>Register</button>

              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Pehle se account hai? </span>
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(false); setErrorMsg(''); setSuccessMsg(''); }}
                  style={toggleButtonStyle}
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // DASHBOARD SCREEN (AFTER LOGIN)
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#1e293b', color: '#fff', padding: '15px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px' }}>Broiler Management System</h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#cbd5e1' }}>
            Logged in: <strong>{email}</strong> | Assigned Role: <span style={roleBadgeStyle}>{userRole}</span>
          </p>
        </div>
        <button onClick={() => setIsLoggedIn(false)} style={logoutButtonStyle}>Logout</button>
      </header>

      <main style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <div style={cardStyle}>
            <h3>Total Active Batches</h3>
            <p style={numberStyle}>{batches.length}</p>
          </div>
          <div style={cardStyle}>
            <h3>Backend Status</h3>
            <p style={{ ...numberStyle, color: '#16a34a', fontSize: '18px' }}>Connected ✅</p>
          </div>
          <div style={cardStyle}>
            <h3>Your Access Level</h3>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#2563eb', margin: '10px 0 0 0' }}>{userRole} Dashboard</p>
          </div>
        </div>

        <section style={{ marginTop: '25px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0 }}>{userRole} Operations Panel</h2>
          <p>🔷 Multi-role backend database routing active.</p>
        </section>

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
const loginContainerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: 'Arial, sans-serif' };
const loginBoxStyle = { backgroundColor: '#ffffff', padding: '30px', borderRadius: '10px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)', width: '100%', maxWidth: '400px' };
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#334155', marginBottom: '5px' };
const inputStyle = { width: '100%', padding: '10px 12px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' };
const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '5px' };
const toggleButtonStyle = { background: 'none', border: 'none', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' };
const logoutButtonStyle = { padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const roleBadgeStyle = { backgroundColor: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' };
const cardStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center' };
const numberStyle = { fontSize: '26px', fontWeight: 'bold', color: '#2563eb', margin: '10px 0 0 0' };
const errorBoxStyle = { backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' };
const successBoxStyle = { backgroundColor: '#dcfce7', color: '#15803d', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' };

export default App;
