import React from 'react';
import { useNavigate } from 'react-router-dom';
import athkarData from '../data/athkarData';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    ...athkarData,
    {
      id: 100,
      name: "القرآن الكريم",
      description: "جزء عم - السور القصيرة مع فضائلها",
      icon: "📖",
      time: "anytime"
    }
  ];

  return (
    <div className="home-container">
      <h1 className="app-title">نور الهدى</h1>
      
      <div className="categories-grid">
        {categories.map(category => (
          <div 
            key={category.id}
            className="category-card"
            onClick={() => {
              if (category.id === 100) {
                navigate('/quran');
              } else {
                navigate(`/athkar/${category.id}`);
              }
            }}
          >
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-name">{category.name}</h3>
            <p className="category-description">{category.description}</p>
            
            {category.time && (
              <div className="time-badge">
                {category.time === 'morning' && '🌞 صباحاً'}
                {category.time === 'evening' && '🌙 مساءً'}
                {category.time === 'night' && '🌚 قبل النوم'}
                {category.time === 'after-prayer' && '🕌 بعد الصلاة'}
                {category.time === 'anytime' && '⏳ في أي وقت'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;