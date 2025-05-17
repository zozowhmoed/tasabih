import React, { useState } from 'react';
import quranData from '../data/quran';
import '../styles/Quran.css';
import '../styles/TopButton.css'; // نستورد ملف التنسيقات الجديد

const Quran = ({ back }) => {
  const [selectedSurah, setSelectedSurah] = useState(null);

  return (
    <div className="quran-container">
      {/* زر العودة الجديد */}
      <button className="top-nav-button" onClick={back}>
        <span>←</span> القائمة الرئيسية
      </button>

      {!selectedSurah ? (
        <div className="surah-selection">
          <h2 className="section-title">
            <span role="img" aria-label="Quran">📖</span> القرآن الكريم
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
        </div>
      )}
    </div>
  );
};

export default Quran;