import React, { useState, useEffect } from 'react';
import hadithData from '../data/hadith';
import '../styles/Hadith.css';

const Hadith = ({ back }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  // استرجاع المفضلة من localStorage عند التحميل
  useEffect(() => {
    const savedFavorites = localStorage.getItem('hadithFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // حفظ المفضلة في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem('hadithFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // تصنيف الأحاديث حسب الفئة
  const categories = [...new Set(hadithData.map(hadith => hadith.category))];

  // تصفية الأحاديث حسب البحث والفئة
  const filteredHadiths = hadithData.filter(hadith => {
    const matchesCategory = !selectedCategory || 
                          (selectedCategory === 'المفضلة' ? favorites.includes(hadith.id) : hadith.category === selectedCategory);
    const matchesSearch = hadith.text.includes(searchTerm) || 
                         hadith.title.includes(searchTerm) || 
                         hadith.source.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  // إضافة/إزالة من المفضلة
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="hadith-container">
      <h2 className="section-title">
        <span className="icon">🕌</span> الأحاديث النبوية
      </h2>

      <div className="hadith-controls">
        <input
          type="text"
          placeholder="ابحث في الأحاديث..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="category-filters">
          <button
            className={`category-btn ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            الكل
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
          {favorites.length > 0 && (
            <button
              className={`category-btn ${selectedCategory === 'المفضلة' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('المفضلة')}
            >
              المفضلة ({favorites.length})
            </button>
          )}
        </div>
      </div>

      <div className="hadith-list">
        {filteredHadiths.length > 0 ? (
          filteredHadiths.map(hadith => (
            <div key={hadith.id} className="hadith-card">
              <div className="hadith-header">
                <h3>{hadith.title}</h3>
                <button
                  className={`favorite-btn ${favorites.includes(hadith.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(hadith.id)}
                  title={favorites.includes(hadith.id) ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                >
                  {favorites.includes(hadith.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <p className="hadith-text">{hadith.text}</p>
              <div className="hadith-footer">
                <span className="hadith-category">{hadith.category}</span>
                <span className="hadith-source">{hadith.source}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>لا توجد أحاديث مطابقة للبحث</p>
          </div>
        )}
      </div>

      <div className="hadith-actions">
        <button className="back-button" onClick={back}>
          العودة للقائمة الرئيسية
        </button>
      </div>
    </div>
  );
};

export default Hadith;