

import React, { useState, useEffect } from 'react';
import '../styles/CardPage.css';
import {useLocation } from 'react-router-dom';

// 카드 데이터는 그대로 사용
const initialCards = [
  { id: 0,  name: 'The Fool',            frontImage: '/card_back2.png', backImage: '/card_01.png' },
  { id: 1,  name: 'The Magician',        frontImage: '/card_back2.png', backImage: '/card_02.png' },
  { id: 2,  name: 'The High Priestess',  frontImage: '/card_back2.png', backImage: '/card_03.png' },
  { id: 3,  name: 'The Empress',         frontImage: '/card_back2.png', backImage: '/card_04.png' },
  { id: 4,  name: 'The Emperor',         frontImage: '/card_back2.png', backImage: '/card_05.png' },
  { id: 5,  name: 'The Hierophant',      frontImage: '/card_back2.png', backImage: '/card_06.png' },
  { id: 6,  name: 'The Lovers',          frontImage: '/card_back2.png', backImage: '/card_07.png' },
  { id: 7,  name: 'The Chariot',         frontImage: '/card_back2.png', backImage: '/card_08.png' },
  { id: 8,  name: 'Strength',            frontImage: '/card_back2.png', backImage: '/card_09.png' },
  { id: 9,  name: 'The Hermit',          frontImage: '/card_back2.png', backImage: '/card_10.png' },
  { id: 10, name: 'Wheel of Fortune',    frontImage: '/card_back2.png', backImage: '/card_11.png' },
  { id: 11, name: 'Justice',             frontImage: '/card_back2.png', backImage: '/card_12.png' },
  { id: 12, name: 'The Hanged Man',      frontImage: '/card_back2.png', backImage: '/card_13.png' },
  { id: 13, name: 'Death',               frontImage: '/card_back2.png', backImage: '/card_14.png' },
  { id: 14, name: 'Temperance',          frontImage: '/card_back2.png', backImage: '/card_15.png' },
  { id: 15, name: 'The Devil',           frontImage: '/card_back2.png', backImage: '/card_16.png' },
  { id: 16, name: 'The Tower',           frontImage: '/card_back2.png', backImage: '/card_17.png' },
  { id: 17, name: 'The Star',            frontImage: '/card_back2.png', backImage: '/card_18.png' },
  { id: 18, name: 'The Moon',            frontImage: '/card_back2.png', backImage: '/card_19.png' },
  { id: 19, name: 'The Sun',             frontImage: '/card_back2.png', backImage: '/card_20.png' },
  { id: 20, name: 'Judgement',           frontImage: '/card_back2.png', backImage: '/card_21.png' },
  { id: 21, name: 'The World',           frontImage: '/card_back2.png', backImage: '/card_22.png' },
];

// 개별 카드 컴포넌트
const Card = ({ frontImage, backImage, isFlipped, onClick }) => (
  <div className={`card-container ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
    <div className="card-flipper">
      <div className="card-face card-front" style={{ backgroundImage: `url(${frontImage})` }} />
      <div className="card-face card-back" style={{ backgroundImage: `url(${backImage})` }} />
    </div>
  </div>
);

// 메인 페이지 컴포넌트
function CardPage() { // props로 question을 받습니다.
  const [cards] = useState(initialCards);
  const [selectedCards, setSelectedCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const question = useLocation().state;

  // 캐러셀에 보여줄 카드의 수
  const cardsToShow = 5;

  // 카드 3장이 모두 선택되었을 때 백엔드로 요청을 보내는 함수
  const sendTarotRequest = async () => {
    // 선택된 카드들의 ID만 추출
    const cardIds = selectedCards.map(card => card.id);

    // 요청 본문(body)을 JSON 형식에 맞게 구성
    const requestBody = {
      cards: cardIds,
      question: question, // props로 받은 question 사용
    };

    console.log("백엔드로 전송할 데이터:", requestBody);

    try {
      const response = await fetch('YOUR_BACKEND_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('요청 성공:', result);

      // 요청 성공 후 2초 대기
      await wait(2000); 

      // 다음 페이지로 이동하는 로직을 여기에 추가
      console.log("2초 대기 후 다음 페이지로 이동합니다.");
      navigate("/result", { state: requestBody});
      
    } catch (error) {
      console.error('요청 실패:', error);
    }

  };

  // 선택된 카드가 변경될 때마다 이펙트 실행
  useEffect(() => {
    // 3장이 모두 선택되면 sendTarotRequest 함수 호출
    if (selectedCards.length === 3) {
      sendTarotRequest();
      
    }
  }, [selectedCards, question]); // selectedCards와 question이 변경될 때만 실행

  const handleCardSelect = (card) => {
    if (selectedCards.length >= 3 || selectedCards.find(c => c.id === card.id)) {
      return;
    }
    setSelectedCards([...selectedCards, card]);
  };

  const handleNext = () => {
    const unselectedCount = initialCards.length - selectedCards.length;
    if (currentIndex < unselectedCount - cardsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const unselectedCards = cards.filter(card => !selectedCards.find(c => c.id === card.id));
  const visibleCards = unselectedCards.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <div className="card-page-background">
      {/* 상단 박스 */}
      <div className="top-box">
        <div className="selected-area">
          {/* 선택된 카드들을 먼저 렌더링 */}
          {selectedCards.map(card => (
            <div className="selected-card-wrapper" key={`selected-${card.id}`}>
              <Card
                frontImage={card.frontImage}
                backImage={card.backImage}
                isFlipped={true}
              />
              <p className="card-name">{card.name}</p>
            </div>
          ))}
          {/* 남은 자리만큼 플레이스홀더 렌더링 */}
          {Array.from({ length: 3 - selectedCards.length }).map((_, index) => (
            <div className="selected-card-wrapper" key={`placeholder-${index}`}>
              <div className="placeholder-card" />
              <p className="card-name">&nbsp;</p>
            </div>
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