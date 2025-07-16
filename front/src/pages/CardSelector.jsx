import React, { useState } from 'react';
import '../styles/CardPage.css';

// 카드 데이터는 그대로 사용
const initialCards = [
  {id: 1, frontImage: '/card_back2.png', backImage: '/card_front_1.png' },
  { id: 2, frontImage: '/card_back2.png', backImage: '/card_front_2.png' },
  { id: 3, frontImage: '/card_back2.png', backImage: '/card_front_3.png' },
  { id: 4, frontImage: '/card_back2.png', backImage: '/card_front_4.png' },
  { id: 5, frontImage: '/card_back2.png', backImage: '/card_front_5.png' },
  { id: 6, frontImage: '/card_back2.png', backImage: '/card_front_6.png' },
  { id: 7, frontImage: '/card_back2.png', backImage: '/card_front_7.png' },
  { id: 8, frontImage: '/card_back2.png', backImage: '/card_front_8.png' },
  { id: 9, frontImage: '/card_back2.png', backImage: '/card_front_9.png' },
  { id: 10, frontImage: '/card_back2.png', backImage: '/card_front_10.png' },
  { id: 11, frontImage: '/card_back2.png', backImage: '/card_front_11.png' },
  { id: 12, frontImage: '/card_back2.png', backImage: '/card_front_12.png' },
  { id: 13, frontImage: '/card_back2.png', backImage: '/card_front_13.png' },
  { id: 14, frontImage: '/card_back2.png', backImage: '/card_front_14.png' },
  { id: 15, frontImage: '/card_back2.png', backImage: '/card_front_15.png' },
  { id: 16, frontImage: '/card_back2.png', backImage: '/card_front_16.png' },
  { id: 17, frontImage: '/card_back2.png', backImage: '/card_front_17.png' },
  { id: 18, frontImage: '/card_back2.png', backImage: '/card_front_18.png' },
  { id: 19, frontImage: '/card_back2.png', backImage: '/card_front_19.png' },
  { id: 20, frontImage: '/card_back2.png', backImage: '/card_front_20.png' },
  { id: 21, frontImage: '/card_back2.png', backImage: '/card_front_21.png' },
  { id: 22, frontImage: '/card_back2.png', backImage: '/card_front_22.png' },
];

// 개별 카드 컴포넌트
const Card = ({ frontImage, backImage, isFlipped, onClick }) => (
  <div className={`card-container ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
    <div className="card-flipper">
      <div className="card-face card-front" style={{ backgroundImage: `url(${frontImage})` }} />
      {/* 선택된 상단 카드만 뒷면 이미지를 렌더링하도록 처리 */}
      {/* backImage가 있으면 뒷면 렌더링. 단, 뒤집힌 상태가 아닐 때(캐러셀)는 앞면만 보이므로 문제 없음 */}
      <div className="card-face card-back" style={{ backgroundImage: `url(${backImage})` }} />
    </div>
  </div>
);

// 메인 페이지 컴포넌트
function CardPage() {
  const [cards] = useState(initialCards);
  const [selectedCards, setSelectedCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 캐러셀에 보여줄 카드의 수
  const cardsToShow = 5;

  const handleCardSelect = (card) => {
    // 이미 3장을 선택했거나, 이미 선택된 카드라면 추가하지 않음
    if (selectedCards.length >= 3 || selectedCards.find(c => c.id === card.id)) {
      return;
    }
    // 선택된 카드 추가
    setSelectedCards([...selectedCards, card]);
  };

  const handleNext = () => {
    // 현재 인덱스를 다음으로 이동
    if (currentIndex < initialCards.length - cardsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    // 현재 인덱스를 이전으로 이동
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 선택되지 않은 카드들만 필터링
  const unselectedCards = cards.filter(card => !selectedCards.find(c => c.id === card.id));
  // 현재 인덱스부터 보여줄 카드 수만큼 잘라내기
  const visibleCards = unselectedCards.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <div className="card-page-background">
      {/* 상단 박스 */}
      <div className="top-box">
        <div className="selected-area">
          {/* 선택된 카드들을 먼저 렌더링 */}
          {selectedCards.map(card => (
            <Card
              key={`selected-${card.id}`}
              frontImage={card.frontImage}
              backImage={card.backImage}
              isFlipped={true}
            />
          ))}
          {/* 남은 자리만큼 플레이스홀더 렌더링 */}
          {Array.from({ length: 3 - selectedCards.length }).map((_, index) => (
            <div key={`placeholder-${index}`} className="placeholder-card" />
          ))}
        </div>
        {selectedCards.length < 3 && <p className="guide-text">카드를 3장 선택해주세요.</p>}
      </div>

      {/* 하단 박스 */}
      <div className="bottom-box">
        <div className="carousel-area">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="arrow-btn">
            &lt;
          </button>
          <div style={{ overflow: 'hidden' }}>
            <div className="card-selection-area" style={{ transform: `translateX(-${currentIndex * 140}px)` }}>
              {unselectedCards.map(card => (
                <Card
                  key={card.id}
                  frontImage={card.frontImage}
                  backImage={card.backImage}
                  isFlipped={false}
                  onClick={() => handleCardSelect(card)}
                />
              ))}
            </div>
          </div>
          <button onClick={handleNext} disabled={currentIndex + cardsToShow >= unselectedCards.length} className="arrow-btn">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardPage;