import React, { useState } from 'react';
import juzAmmaLast15 from '../data/juzAmmaLast15';
import '../styles/Quran.css';
import '../styles/TopButton.css';

const Quran = ({ back }) => {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSurahs = juzAmmaLast15.filter(surah =>
    surah.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="quran-container">
      <button className="top-nav-button" onClick={back}>
        <span>←</span> القائمة الرئيسية
      </button>

      {!selectedSurah ? (
        <div className="surah-selection">
          <div className="quran-header">
            <h2 className="section-title">
              <span className="quran-icon">📖</span> القرآن الكريم
            </h2>
            <p className="section-subtitle">جزء عم - السور القصيرة</p>
            
            <div className="search-container">
              <input
                type="text"
                placeholder="ابحث عن سورة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="surah-grid">
            {filteredSurahs.map(surah => (
              <div 
                key={surah.id}
                className="surah-card"
                onClick={() => setSelectedSurah(surah)}
              >
                <div className="surah-number">{surah.id - 99}</div>
                <div className="surah-content">
                  <h3>{surah.name}</h3>
                  <p className="verses-count">{surah.verses} آيات</p>
                </div>
                <div className="surah-reward">
                  <span>🔼</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="surah-details">
          <div className="surah-header">
            <button 
              className="back-button"
              onClick={() => setSelectedSurah(null)}
            >
              العودة للسور
            </button>
            
            <div className="surah-title">
              <h2>
                <span className="surah-number">{selectedSurah.id - 99}.</span>
                {selectedSurah.name}
              </h2>
              <p className="verses-count">{selectedSurah.verses} آيات</p>
            </div>
            
            <div className="reward-badge">
              <span>🎁</span> {selectedSurah.reward}
            </div>
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