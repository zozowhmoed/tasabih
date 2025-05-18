import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tasbeeh = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [target] = useState(33);
  const [selectedTasbeeh, setSelectedTasbeeh] = useState(0);
  
  const tasbeehat = [
    { text: "سبحان الله", description: "التسبيح" },
    { text: "الحمد لله", description: "التحميد" },
    { text: "الله أكبر", description: "التكبير" },
    { text: "لا إله إلا الله", description: "التوحيد" },
    { text: "لا حول ولا قوة إلا بالله", description: "الحوقلة" }
  ];

  const incrementCount = () => {
    if (count < target) {
      setCount(count + 1);
    }
  };

  const resetCount = () => {
    setCount(0);
  };

  const changeTasbeeh = () => {
    setSelectedTasbeeh((prev) => (prev + 1) % tasbeehat.length);
    setCount(0);
  };

  return (
    <div className="tasbeeh-container">
      <div className="header-container">
        <button className="back-button" onClick={() => navigate('/')}>
          <span className="back-arrow">←</span> الرجوع
        </button>
        <h1 className="main-title">خانة التسابيح</h1>
      </div>

      <div className="tasbeeh-selector">
        {tasbeehat.map((tasbeeh, index) => (
          <button
            key={index}
            className={`tasbeeh-option ${selectedTasbeeh === index ? 'active' : ''}`}
            onClick={() => {
              setSelectedTasbeeh(index);
              setCount(0);
            }}
          >
            <span className="tasbeeh-text">{tasbeeh.text}</span>
            <span className="tasbeeh-desc">{tasbeeh.description}</span>
          </button>
        ))}
      </div>

      <div className="counter-card">
        <div className="counter-display">
          <span className="count">{count}</span>
          <span className="divider">/</span>
          <span className="target">{target}</span>
        </div>
        
        <p className="current-tasbeeh">{tasbeehat[selectedTasbeeh].text}</p>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(count / target) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.round((count / target) * 100)}%</span>
        </div>
        
        <div className="buttons-container">
          <button 
            className="count-button"
            onClick={incrementCount}
            disabled={count >= target}
          >
            اضغط للتسبيح
          </button>
          
          <button 
            className="reset-button"
            onClick={resetCount}
          >
            إعادة العداد
          </button>
          
          <button 
            className="change-button"
            onClick={changeTasbeeh}
          >
            تغيير التسبيح
          </button>
        </div>
      </div>

      <style jsx>{`
        .tasbeeh-container {
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

        .tasbeeh-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin: 2rem 0;
        }
        
        .tasbeeh-option {
          padding: 1rem;
          border: 2px solid var(--primary-color);
          background: transparent;
          color: var(--text-color);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          min-width: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .tasbeeh-option.active,
        .tasbeeh-option:hover {
          background: var(--primary-color);
          color: white;
        }
        
        .tasbeeh-text {
          font-size: 1.3rem;
          margin-bottom: 0.3rem;
        }
        
        .tasbeeh-desc {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        
        .counter-card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: var(--card-shadow);
          margin: 1rem auto;
          text-align: center;
          border: 1px solid var(--border-color);
          max-width: 500px;
        }
        
        .counter-display {
          display: flex;
          justify-content: center;
          align-items: baseline;
          gap: 0.5rem;
          font-size: 2.5rem;
          margin: 1rem 0;
        }
        
        .count {
          color: var(--primary-color);
          font-weight: bold;
        }
        
        .divider {
          color: var(--text-color);
          opacity: 0.5;
        }
        
        .target {
          color: var(--text-color);
          opacity: 0.7;
        }
        
        .current-tasbeeh {
          font-size: 2rem;
          color: var(--primary-color);
          margin: 1.5rem 0;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .progress-container {
          margin: 2rem 0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .progress-bar {
          height: 10px;
          background: var(--border-color);
          border-radius: 5px;
          flex-grow: 1;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: var(--accent-color);
          transition: width 0.3s ease;
        }
        
        .progress-text {
          font-size: 0.9rem;
          color: var(--text-color);
          opacity: 0.7;
          min-width: 40px;
        }
        
        .buttons-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .count-button, 
        .reset-button,
        .change-button {
          padding: 1rem;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .count-button {
          background: var(--primary-color);
          color: white;
        }
        
        .count-button:hover {
          background: var(--secondary-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .count-button:disabled {
          background: var(--border-color);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .reset-button {
          background: var(--accent-color);
          color: var(--text-color);
        }
        
        .reset-button:hover {
          background: var(--secondary-color);
          color: white;
        }
        
        .change-button {
          background: var(--card-bg);
          color: var(--text-color);
          border: 2px solid var(--primary-color);
        }
        
        .change-button:hover {
          background: var(--primary-color);
          color: white;
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 1.8rem;
            margin-top: 3rem;
          }
          
          .tasbeeh-option {
            min-width: 120px;
            padding: 0.8rem;
          }
          
          .tasbeeh-text {
            font-size: 1.1rem;
          }
          
          .current-tasbeeh {
            font-size: 1.8rem;
          }
          
          .counter-display {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .tasbeeh-selector {
            gap: 0.5rem;
          }
          
          .tasbeeh-option {
            min-width: 100px;
            padding: 0.6rem;
            font-size: 0.9rem;
          }
          
          .current-tasbeeh {
            font-size: 1.5rem;
          }
          
          .count-button,
          .reset-button,
          .change-button {
            padding: 0.8rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Tasbeeh;