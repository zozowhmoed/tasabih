import React, { useState } from 'react';
import quranData from '../data/quran';
import '../styles/Quran.css';

const Quran = ({ back }) => {
  const [selectedSurah, setSelectedSurah] = useState(null);

  return (
    <div className="quran-container">
      {!selectedSurah ? (
        <div className="surah-selection">
          <h2 className="section-title">
            <span className="icon">📖</span> القرآن الكريم
          </h2>
          <div className="surah-grid">
            {quranData.map(surah => (
              <div 
                key={surah.id}
                className="surah-card"
                onClick={() => setSelectedSurah(surah)}
              >
                <div className="surah-number">{surah.id}</div>
                <h3>{surah.name}</h3>
                <p className="verses-count">{surah.verses} آيات</p>
              </div>
            ))}
          </div>
          <button className="back-button" onClick={back}>
            العودة للقائمة الرئيسية
          </button>
        </div>
      ) : (
        <div className="surah-details">
          <div className="surah-header">
            <h2>
              <span className="surah-number">{selectedSurah.id}.</span>
              {selectedSurah.name}
            </h2>
            <p className="reward-badge">الأجر: {selectedSurah.reward}</p>
          </div>
          
          <div className="verses-container">
            {selectedSurah.content.split('\n').map((verse, index) => (
              <p key={index} className="verse">
                <span className="verse-number">{index + 1}</span>
                {verse}
              </p>
            ))}
          </div>
          
          <div className="surah-actions">
            <button 
              className="back-button"
              onClick={() => setSelectedSurah(null)}
            >
              العودة للسور
            </button>
            <button className="back-button" onClick={back}>
              العودة للقائمة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quran;