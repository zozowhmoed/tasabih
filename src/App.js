import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Athkar from './components/Athkar';
import Quran from './components/Quran';

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
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/athkar/:categoryId" element={<Athkar />} />
            <Route path="/quran" element={<QuranWrapper back={() => window.history.back()} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

// مكون مساعد للتعامل مع navigation في Quran
function QuranWrapper({ back }) {
  const navigate = useNavigate();
  return <Quran back={() => navigate('/')} />;
}

// مكون الفوتر الجديد
function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>تم إنشاء وتطوير هذا المشروع بواسطة محمد أبو طبيخ</p>
        <p className="copyright">&copy; {new Date().getFullYear()} جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
}

export default App;