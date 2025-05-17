import React, { useState } from 'react';
import hadithData from '../data/hadith';
import '../styles/Hadith.css';
import '../styles/TopButton.css';

const Hadith = ({ back }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // تصنيف الأحاديث حسب الفئة
  const categories = [...new Set(hadithData.map(h => h.category))];

  const filteredHadiths = () => {
    return hadithData.filter(h => 
      !selectedCategory || h.category === selectedCategory
    );
  };

  return (
    <div className="hadith-container">
      <button className="top-nav-button" onClick={back}>
        <span>←</span> القائمة الرئيسية
      </button>

      <h2 className="section-title">
        <span role="img" aria-label="Hadith">🕌</span> الأحاديث النبوية
      </h2>

      <div className="category-filters">
        <button
          className={`category-btn ${!selectedCategory ? 'active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          الكل ({hadithData.length})
        </button>
        {categories.map(category => {
          const count = hadithData.filter(h => h.category === category).length;
          return (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      <div className="hadith-list-container">
        <div className="hadith-list">
          {filteredHadiths().map((hadith) => (
            <div key={hadith.id} className="hadith-card">
              <div className="hadith-header">
                <h3>{hadith.title}</h3>
                <span className="hadith-number">#{hadith.id}</span>
              </div>
              <p className="hadith-text">{hadith.text}</p>
              <div className="hadith-footer">
                <span className="category">{hadith.category}</span>
                <span className="source">{hadith.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hadith-count">
        عرض {filteredHadiths().length} من {hadithData.length} حديث
      </div>
    </div>
  );
};

export default Hadith;