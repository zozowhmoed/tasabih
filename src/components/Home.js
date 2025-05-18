import React from 'react';
import { useNavigate } from 'react-router-dom';
import athkarData from '../data/athkarData';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="app-title">نور الهدى</h1>
      <div className="categories-grid">
        {athkarData.map(category => (
          <div 
            key={category.id}
            className="category-card"
            onClick={() => navigate(`/athkar/${category.id}`)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-name">{category.name}</h3>
            <p className="category-description">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;