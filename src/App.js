import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Athkar from './components/Athkar';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="app">
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === 'light' ? 'تفعيل الوضع المظلم' : 'تفعيل الوضع الفاتح'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/athkar/:categoryId" element={<Athkar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;