import React, { useState } from 'react';
import athkarData from '../data/athkar';
import '../styles/Athkar.css';

const Athkar = ({ back }) => {
  const [selectedThikr, setSelectedThikr] = useState(null);
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    if (newCount >= selectedThikr.target) {
      setCompleted(true);
    }
  };

  const resetSelection = () => {
    setSelectedThikr(null);
    setCount(0);
    setCompleted(false);
  };

  return (
    <div className="athkar-container">
      {!selectedThikr ? (
        <div className="thikr-selection">
          <h2 className="section-title">
            <span className="icon">📿</span> الأذكار والتسبيح
          </h2>
          <div className="thikr-grid">
            {athkarData.map(thikr => (
              <div 
                key={thikr.id}
                className="thikr-card"
                onClick={() => setSelectedThikr(thikr)}
              >
                <h3>{thikr.name}</h3>
                <p className="target-count">العدد المطلوب: {thikr.target}</p>
              </div>
            ))}
          </div>
          <button className="back-button" onClick={back}>
            العودة للقائمة الرئيسية
          </button>
        </div>
      ) : (
        <div className="thikr-counter">
          <div className="thikr-header">
            <h2>{selectedThikr.name}</h2>
            <p className="thikr-text">{selectedThikr.text}</p>
          </div>
          
          <div className="counter-display">
            <div className="count-circle">
              <span className="current-count">{count}</span>
              <span className="target-count">/{selectedThikr.target}</span>
            </div>
          </div>
          
          <button 
            className="count-button"
            onClick={handleCount}
            disabled={completed}
          >
            {completed ? 'مكتمل' : 'اضغط للعد'}
          </button>
          
          {completed && (
            <div className="congrats-message">
              <p className="reward-text">🎉 {selectedThikr.reward}</p>
            </div>
          )}
          
          <div className="thikr-actions">
            <button className="back-button" onClick={resetSelection}>
              ذكر آخر
            </button>
            <button className="back-button" onClick={back}>
              العودة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Athkar;