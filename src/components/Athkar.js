import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import athkarData from '../data/athkarData';
import './Athkar.css';

const Athkar = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [currentThikrIndex, setCurrentThikrIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentThikr, setCurrentThikr] = useState(null);

  useEffect(() => {
    const category = athkarData.find(cat => cat.id === parseInt(categoryId));
    if (category) {
      setSelectedCategory(category);
      setCurrentThikr(category.content[0]);
    }
  }, [categoryId]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    if (newCount >= currentThikr.target) {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCount(0);
    setCompleted(false);
    setShowReward(false);
  };

  const handleComplete = () => {
    if (count >= currentThikr.target) {
      setShowReward(true);
    }
  };

  const handleNext = () => {
    if (currentThikrIndex < selectedCategory.content.length - 1) {
      const newIndex = currentThikrIndex + 1;
      setCurrentThikrIndex(newIndex);
      setCurrentThikr(selectedCategory.content[newIndex]);
      setCount(0);
      setCompleted(false);
      setShowReward(false);
    }
  };

  const handlePrev = () => {
    if (currentThikrIndex > 0) {
      const newIndex = currentThikrIndex - 1;
      setCurrentThikrIndex(newIndex);
      setCurrentThikr(selectedCategory.content[newIndex]);
      setCount(0);
      setCompleted(false);
      setShowReward(false);
    }
  };

  const getRandomReward = () => {
    const rewards = [
      "غُفرت ذنوبك ورفع الله درجاتك!",
      "بُني لك بيت في الجنة!",
      "كتب الله لك 1000 حسنة!",
      "ستنال شفاعة النبي ﷺ يوم القيامة!",
      "حُطت عنك خطاياك كما يُحط الورق عن الشجرة!",
    ];
    return rewards[Math.floor(Math.random() * rewards.length)];
  };

  if (!selectedCategory || !currentThikr) {
    return <div className="loading">جاري التحميل...</div>;
  }

  return (
    <div className="athkar-container">
      <button className="back-button" onClick={() => navigate('/')}>
        العودة إلى القائمة الرئيسية
      </button>
      
      <div className="category-header">
        <h2>{selectedCategory.name}</h2>
        <p>{selectedCategory.description}</p>
      </div>
      
      <div className="thikr-card">
        <h3 className="thikr-text">{currentThikr.text}</h3>
        <p className="thikr-description">{currentThikr.description}</p>
        
        <div className="counter">
          <span className="count">{count}</span>
          <span> / {currentThikr.target}</span>
        </div>
        
        <div className="buttons">
          <button 
            className="action-button increment" 
            onClick={handleIncrement}
            disabled={completed}
          >
            +
          </button>
          
          <button 
            className="action-button reset" 
            onClick={handleReset}
          >
            إعادة
          </button>
          
          <button 
            className="action-button complete" 
            onClick={handleComplete}
            disabled={!completed}
          >
            تمت
          </button>
        </div>
        
        <div className="navigation">
          <button onClick={handlePrev} disabled={currentThikrIndex === 0}>
            السابق
          </button>
          <span>{currentThikrIndex + 1} / {selectedCategory.content.length}</span>
          <button onClick={handleNext} disabled={currentThikrIndex === selectedCategory.content.length - 1}>
            التالي
          </button>
        </div>
      </div>
      
      {showReward && (
        <div className="reward-notification">
          <h3>مبارك! لقد أكملت الذكر 🎉</h3>
          <p className="reward-text"><strong>الفضل:</strong> {currentThikr.reward}</p>
          <p className="reward-reference"><strong>المرجع:</strong> {currentThikr.reference}</p>
          <p className="random-reward">✨ <strong>أجرك:</strong> {getRandomReward()}</p>
          <button 
            className="close-notification" 
            onClick={() => setShowReward(false)}
          >
            إغلاق
          </button>
        </div>
      )}
    </div>
  );
};

export default Athkar;