import React, { useState, useEffect } from 'react';
import './App.css';
import Quran from './components/Quran';
import Hadith from './components/Hadith';
import Athkar from './components/Athkar';

function App() {
  const [page, setPage] = useState('main');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        title={theme === 'light' ? 'تفعيل الوضع المظلم' : 'تفعيل الوضع الفاتح'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      
      {page === 'main' ? (
        <div className="main-menu">
          <h1 className="main-title">نور الهدى</h1>
          <div className="menu-buttons">
            <button className="menu-button" onClick={() => setPage('quran')}>
              <span className="icon">📖</span>
              <span>القرآن الكريم</span>
            </button>
            
            <button className="menu-button" onClick={() => setPage('hadith')}>
              <span className="icon">🕌</span>
              <span>الأحاديث النبوية</span>
            </button>
            
            <button className="menu-button" onClick={() => setPage('athkar')}>
              <span className="icon">📿</span>
              <span>الأذكار والتسبيح</span>
            </button>
          </div>
          <footer>تم الإنشاء بواسطة محمد أبو طبيخ</footer>
        </div>
      ) : (
        <div className="content">
          {page === 'quran' && <Quran back={() => setPage('main')} />}
          {page === 'hadith' && <Hadith back={() => setPage('main')} />}
          {page === 'athkar' && <Athkar back={() => setPage('main')} />}
        </div>
      )}
    </div>
  );
}

export default App;