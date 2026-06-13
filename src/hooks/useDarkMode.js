import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useDarkMode = (userId) => {
  const [darkMode, setDarkMode] = useState(true); // Default true

  // Load from DB on mount
  useEffect(() => {
    const loadDarkMode = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/users/${userId}`);
        const saved = data.dark_mode;
        setDarkMode(saved === 'true' || saved === true);
        localStorage.setItem('ujconnect_dark_mode', saved === 'true' ? 'true' : 'false');
      } catch (err) {
        // Fallback to localStorage
        const saved = localStorage.getItem('ujconnect_dark_mode');
        setDarkMode(saved !== null ? saved === 'true' : true);
      }
    };
    if (userId) loadDarkMode();
  }, [userId]);

  // Save to both DB and localStorage
  const toggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('ujconnect_dark_mode', newValue ? 'true' : 'false');
    
    try {
      await axios.put(`${API_URL}/api/users/${userId}/dark-mode`, {
        dark_mode: newValue ? 'true' : 'false'
      });
    } catch (err) {
      // Silently fail — user still sees the change locally
    }
  };

  // Sync across tabs
  useEffect(() => {
    const onStorage = () => {
      const saved = localStorage.getItem('ujconnect_dark_mode');
      if (saved !== null) setDarkMode(saved === 'true');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return [darkMode, toggleDarkMode];
};