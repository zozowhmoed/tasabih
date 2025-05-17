import React, { useState, useEffect } from 'react';
import athkarData from '../data/athkar';
import '../styles/Athkar.css';
import '../styles/TopButton.css';

const Athkar = ({ back }) => {
  const [selectedThikr, setSelectedThikr] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);

  // التحقق من وجود المحتوى قبل الوصول إليه
  const currentContent = selectedThikr?.content?.[currentIndex] || {};

  const handleCount = () => {
    if (count < (currentContent.target || 0)) {
      setCount(prev => prev + 1);
    }
  };

  const nextThikr = () => {
    if (currentIndex < (selectedThikr?.content?.length || 0) - 1) {
      setCurrentIndex(currentIndex + 1);
      setCount(0);
    } else {
      setSelectedThikr(null);
      setCurrentIndex(0);
      setCount(0);
    }
  };

  // إعادة تعيين العد عند تغيير الذكر الحالي
  useEffect(() => {
    setCount(0);
  }, [currentIndex]);

  return (
    <div className="athkar-container">
      <button className="top-nav-button" onClick={back}>
        <span>←</span> القائمة الرئيسية
      </button>

      {!selectedThikr ? (
        <div className="thikr-selection">
          <h2 className="section-title">
            <span role="img" aria-label="Prayer">📿</span> الأذكار والتسبيح
          </h2>
          <div className="thikr-grid">
            {athkarData.map(thikr => (
              <div 
                key={thikr.id}
                className="thikr-card"
                onClick={() => {
                  setSelectedThikr(thikr);
                  setCurrentIndex(0);
                  setCount(0);
                }}
              >
                <h3>{thikr.name}</h3>
                <p>{thikr.description}</p>
                <p>يحتوي على {thikr.content.length} ذكر</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="thikr-counter">
          <div className="thikr-header">
            <h3>{selectedThikr.name}</h3>
            <p className="current-thikr">{currentContent.text || 'لا يوجد ذكر متاح'}</p>
            <p className="thikr-description">
              {currentContent.description || ''}
            </p>
          </div>
          
          <div className="counter-display">
            <p className="count">
              {count}/{currentContent.target || 0}
            </p>
          </div>
          
          <div className="thikr-actions">
            <button 
              className={`count-btn ${count >= (currentContent.target || 0) ? 'completed' : ''}`}
              onClick={handleCount}
              disabled={count >= (currentContent.target || 0)}
            >
              {count >= (currentContent.target || 0) ? 'تمت' : 'اضغط للعد'}
            </button>
            <button className="next-btn" onClick={nextThikr}>
              {currentIndex < (selectedThikr.content.length - 1) ? 'الذكر التالي' : 'العودة'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Athkar;