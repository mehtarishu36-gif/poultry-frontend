import React, { useState, useEffect } from 'react';

function App() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Vercel Environment Variable ya Fallback Render Backend URL
  const API_URL = import.meta.env.VITE_API_URL || "https://poultry-backend-tgbx.onrender.com";

  useEffect(() => {
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
  }, [API_URL]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#1e293b', color: '#fff', padding: '15px 20px', borderRadius: '8px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Broiler Management System & Poultry ERP</h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#cbd5e1' }}>Live Cloud Dashboard</p>
      </header>

      <main style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={cardStyle}>
            <h3>Total Batches</h3>
            <p style={numberStyle}>{batches.length}</p>
          </div>
          <div style={cardStyle}>
            <h3>Backend Status</h3>
            <p style={{ ...numberStyle, color: '#16a34a', fontSize: '18px' }}>Connected ✅</p>
          </div>
        </div>

        <section style={{ marginTop: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2>Active Flock Records</h2>
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

const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  textAlign: 'center'
};

const numberStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#2563eb',
  margin: '10px 0 0 0'
};

export default App;