import React, { useState } from 'react';
import '../styles/CardPage.css';


// 카드에 대한 이미지 데이터 (실제 이미지 경로로 변경해야 합니다.)
const initialCards = [
 { id: 1, frontImage: '/card_back.png', backImage: '/card_back2.png' },
 { id: 2, frontImage: '/card_back.png', backImage: '/card_back2.png'},
 { id: 3, frontImage: '/card_back.png', backImage: '/card_back2.png' },
 { id: 4, frontImage: '/card_back.png', backImage: '/card_back2.png' },
 { id: 5, frontImage: '/card_back.png', backImage: '/card_back2.png' },
 { id: 6, frontImage: '/card_back.png', backImage: '/card_back2.png' },
 { id: 7, frontImage: '/card_back.png', backImage: '/card_back2.png' },
 { id: 8, frontImage: '/card_back.png', backImage: '/card_back2.png' },
];


function CardPage() {
 const [cards] = useState(initialCards);
 const [selectedCards, setSelectedCards] = useState([]);
 const [currentIndex, setCurrentIndex] = useState(0);


 const cardsToShow = 5; // 한 번에 보여줄 카드의 수


 // 카드 선택 핸들러
 const handleCardSelect = (card) => {
 // 이미 선택된 카드는 다시 선택 불가
 if (selectedCards.find(c => c.id === card.id)) return;


 // 3개까지만 선택 가능
 if (selectedCards.length < 3) {
 setSelectedCards([...selectedCards, card]);
 }
 };


 // 다음 카드로 이동
 const handleNext = () => {
 const newIndex = currentIndex + cardsToShow;
 if (newIndex < cards.length) {
 setCurrentIndex(newIndex);
 }
 };


 // 이전 카드로 이동
 const handlePrev = () => {
 const newIndex = currentIndex - cardsToShow;
 if (newIndex >= 0) {
 setCurrentIndex(newIndex);
 }
 };


 // 렌더링할 하단 카드 목록
 const unselectedCards = cards.filter(card => !selectedCards.find(c => c.id === card.id));
 const visibleCards = unselectedCards.slice(currentIndex, currentIndex + cardsToShow);


 return (
 <div className="card-page">
 {/* 상단: 선택된 카드 영역 */}
 <div className="selected-area">
 {selectedCards.length === 3 ? (
 selectedCards.map((card, index) => (
 <div key={index} className="card-container flipped">
 <div className="card">
 <div className="card-front" style={{ backgroundImage: `url(${card.frontImage})` }}></div>
 <div className="card-back" style={{ backgroundImage: `url(${card.backImage})` }}></div>
 </div>
 </div>
 ))
 ) : (
 <div className="selection-placeholder">
 카드를 3장 선택해주세요.
 <div className="placeholder-cards">
 <div className="placeholder-card"></div>
 <div className="placeholder-card"></div>
 <div className="placeholder-card"></div>
 </div>
 </div>
 )}
 </div>


 {/* 하단: 카드 선택 영역 (캐러셀) */}
 <div className="carousel-area">
 <button onClick={handlePrev} disabled={currentIndex === 0} className="arrow-btn">
 &lt;
 </button>
 <div className="card-selection-area">
 {visibleCards.map(card => (
 <div key={card.id} className="card-container" onClick={() => handleCardSelect(card)}>
 <div className="card">
 <div className="card-front" style={{ backgroundImage: `url(${card.frontImage})` }}></div>
 </div>
 </div>
 ))}
 </div>
 <button onClick={handleNext} disabled={currentIndex + cardsToShow >= unselectedCards.length} className="arrow-btn">
 &gt;
 </button>
 </div>
 </div>
 );
}


export default CardPage;