import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AzkarAfterPrayer = () => {
  const navigate = useNavigate();
  const [currentZikrIndex, setCurrentZikrIndex] = useState(0);
  const [count, setCount] = useState(0);

  const azkar = [
    {
      text: "أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه",
      count: 3,
    },
    {
      text: "اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام",
      count: 1,
    },
    {
      text: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
      count: 10,
    },
    {
      text: "سبحان الله وبحمده سبحان الله العظيم",
      count: 33,
    },
    {
      text: "الحمد لله",
      count: 33,
    },
    {
      text: "الله أكبر",
      count: 33,
    },
  ];

  const handleNext = () => {
    if (currentZikrIndex < azkar.length - 1) {
      setCurrentZikrIndex(currentZikrIndex + 1);
      setCount(0);
    }
  };

  const handlePrev = () => {
    if (currentZikrIndex > 0) {
      setCurrentZikrIndex(currentZikrIndex - 1);
      setCount(0);
    }
  };

  const incrementCount = () => {
    if (count < azkar[currentZikrIndex].count) {
      setCount(count + 1);
    }
  };

  return (
    <div className="azkar-container">
      <div className="header-container">
        <button className="back-button" onClick={() => navigate('/')}>
          <span className="back-arrow">←</span> الرجوع
        </button>
        <h1 className="main-title">أذكار بعد الصلاة</h1>
      </div>

      <div className="zikr-card">
        <div className="zikr-header">
          <span className="zikr-number">{currentZikrIndex + 1}/{azkar.length}</span>
          <h3 className="zikr-title">ذكر {currentZikrIndex + 1}</h3>
        </div>
        
        <div className="zikr-content">
          <p className="zikr-text">{azkar[currentZikrIndex].text}</p>
          
          <div className="counter-container">
            <div className="counter-display">
              <span className="current-count">{count}</span>
              <span className="divider">/</span>
              <span className="target-count">{azkar[currentZikrIndex].count}</span>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(count / azkar[currentZikrIndex].count) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="zikr-controls">
          <button 
            className="zikr-button" 
            onClick={incrementCount}
            disabled={count >= azkar[currentZikrIndex].count}
          >
            +
          </button>
          <button 
            className="zikr-button reset-button"
            onClick={() => setCount(0)}
          >
            إعادة
          </button>
        </div>

        <div className="navigation-buttons">
          <button 
            className="nav-button"
            onClick={handlePrev}
            disabled={currentZikrIndex === 0}
          >
            السابق
          </button>
          <button 
            className="nav-button"
            onClick={handleNext}
            disabled={currentZikrIndex === azkar.length - 1}
          >
            التالي
          </button>
        </div>
      </div>

      <style jsx>{`
        .azkar-container {
          padding: 1rem;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .header-container {
          position: relative;
          margin-bottom: 2rem;
        }

        .back-button {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: var(--card-shadow);
          z-index: 10;
        }

        .back-button:hover {
          background: var(--secondary-color);
          transform: translateY(-2px);
        }

        .back-arrow {
          font-size: 1.2rem;
        }

        .main-title {
          color: var(--primary-color);
          font-size: 2rem;
          margin: 1rem 0;
          padding-top: 1rem;
          position: relative;
        }

        .zikr-card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: var(--card-shadow);
          margin: 1rem 0;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .zikr-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .zikr-title {
          color: var(--primary-color);
          font-size: 1.3rem;
        }
        
        .zikr-number {
          background: var(--primary-color);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        
        .zikr-text {
          font-size: 1.5rem;
          line-height: 1.8;
          color: var(--text-color);
          text-align: center;
          margin: 2rem 0;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .counter-container {
          margin: 2rem 0;
        }
        
        .counter-display {
          display: flex;
          justify-content: center;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 1rem;
          font-size: 2rem;
        }
        
        .current-count {
          color: var(--primary-color);
          font-weight: bold;
        }
        
        .divider {
          color: var(--text-color);
          opacity: 0.5;
        }
        
        .target-count {
          color: var(--text-color);
          opacity: 0.7;
        }
        
        .progress-bar {
          height: 8px;
          background: var(--border-color);
          border-radius: 4px;
          overflow: hidden;
          margin: 0 auto;
          max-width: 300px;
        }
        
        .progress-fill {
          height: 100%;
          background: var(--accent-color);
          transition: width 0.3s ease;
        }
        
        .zikr-controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        
        .zikr-button {
          background: var(--primary-color);
          color: white;
          border: none;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          font-size: 1.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .zikr-button:hover {
          background: var(--secondary-color);
          transform: scale(1.05);
        }
        
        .zikr-button:disabled {
          background: var(--border-color);
          cursor: not-allowed;
          transform: none;
        }
        
        .reset-button {
          background: var(--accent-color);
          font-size: 1.2rem;
        }
        
        .navigation-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .nav-button {
          background: var(--card-bg);
          color: var(--text-color);
          border: 2px solid var(--primary-color);
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 120px;
        }
        
        .nav-button:hover {
          background: var(--primary-color);
          color: white;
        }
        
        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          border-color: var(--border-color);
        }

        @media (max-width: 768px) {
          .azkar-container {
            padding: 0.5rem;
          }
          
          .main-title {
            font-size: 1.8rem;
            margin-top: 3rem;
          }
          
          .zikr-text {
            font-size: 1.3rem;
            min-height: 80px;
          }
          
          .zikr-card {
            padding: 1.5rem;
          }
          
          .zikr-button {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
          
          .counter-display {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .zikr-text {
            font-size: 1.2rem;
          }
          
          .zikr-button {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }
          
          .nav-button {
            padding: 0.6rem 1rem;
            min-width: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default AzkarAfterPrayer;