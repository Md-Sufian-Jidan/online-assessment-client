// components/ThemeToggle.jsx
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from "react-icons/fa";


const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xl p-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
    </button>
  );
};

export default ThemeToggle;
