// src/services/service.js

const API_URL = import.meta.env.VITE_API_URL || "https://poultry-backend-tgbx.onrender.com";

export const apiService = {
  // 1. Secure Login API Call (Without Role selection)
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
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

  // 2. User Registration API Call
  register: async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      return {
        ok: response.ok,
        ...data
      };
    } catch (error) {
      console.error("Register API Error:", error);
      return {
        success: false,
        message: 'Registration ke dauran server error aaya.'
      };
    }
  },

  // 3. Fetch Active Placements / Batches API Call
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
  }
};
