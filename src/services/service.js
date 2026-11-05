// src/services/service.js

// Vercel Environment Variable ya Fallback Render Backend URL
const API_URL = import.meta.env.VITE_API_URL || "https://poultry-backend-tgbx.onrender.com";

export const apiService = {
  // 1. Secure Login API Call
  login: async (email, password, role) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();
      return {
        ok: response.ok,
        ...data
      };
    } catch (error) {
      console.error("Login API Error:", error);
      return {
        success: false,
        message: 'Server se connection establish nahi ho paya.'
      };
    }
  },

  // 2. Fetch Active Placements / Batches API Call
  getPlacements: async () => {
    try {
      const response = await fetch(`${API_URL}/api/placements`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Data fetch karne mein samasya aayi.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get Placements Error:", error);
      return [];
    }
  },

  // 3. Add New Batch / Placement API Call
  addPlacement: async (batchData) => {
    try {
      const response = await fetch(`${API_URL}/api/placements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(batchData)
      });

      const data = await response.json();
      return {
        ok: response.ok,
        ...data
      };
    } catch (error) {
      console.error("Add Placement Error:", error);
      return {
        success: false,
        message: 'Batch add karte samay server error aaya.'
      };
    }
  }
};
