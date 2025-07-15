// import React, { useState } from "react";

// // 카드 디자인 고정 값
// const CARD_WIDTH = 60;     // 카드의 픽셀 너비
// const CARD_HEIGHT = 90;    // 카드의 픽셀 높이
// const OVERLAP = 20;         // 카드 겹침 (카드 하나마다 겹치는 픽셀)
// const TOTAL_CARDS = 12;     // 전체 카드 수
// const VISIBLE_CARDS = 8;    // 한 번에 보이는 카드 수

// const cardImg = "/card.png"; // public/cards/star.png 위치

// export default function CardSelector() {
//   const [selected, setSelected] = useState([]);
//   const [scrollIdx, setScrollIdx] = useState(0);
//   const [flipped, setFlipped] = useState(false);

//   // 카드 선택 처리
//   const onSelect = (idx) => {
//     if (selected.includes(idx) || selected.length >= 3) return;
//     const next = [...selected, idx];
//     setSelected(next);
//     if (next.length === 3) setTimeout(() => setFlipped(true), 300);
//   };
//   const onPrev = () => setScrollIdx((p) => Math.max(0, p - 1));
//   const onNext = () =>
//     setScrollIdx((p) => Math.min(TOTAL_CARDS - VISIBLE_CARDS, p + 1));
//   const trackOffset = -(CARD_WIDTH - OVERLAP) * scrollIdx;

//   return (
//     <div className="w-full h-screen bg-blue flex items-center justify-center">
//       <div className="w-[85vw] h-[85vh] bg-[#880d1e] border-8 border-[#880d1e] rounded-xl p-10 flex flex-col items-center justify-center shadow-2xl">
//         {/* 위쪽: 선택된 카드 3개, 정확히 가운데 정렬 */}
//         <div className="flex justify-center items-end gap-16 h-[35%] mb-12">
//           {[0, 1, 2].map((slotIdx) => {
//             const cardIdx = selected[slotIdx];
//             return cardIdx !== undefined ? (
//               <div
//                 key={slotIdx}
//                 style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
//                 className="[perspective:1200px] transition-all duration-700"
//               >
//                 <div
//                   className={`
//                     relative w-full h-full
//                     [transform-style:preserve-3d]
//                     transition-transform duration-700
//                     ${flipped ? "[transform:rotateY(180deg)]" : ""}
//                   `}
//                 >
//                   {/* 앞면 */}
//                   <div className="
//                     absolute inset-0
//                     bg-white rounded-lg border border-gray-500
//                     flex flex-col items-center justify-center
//                     [backface-visibility:hidden]
//                   ">
//                     <span className="text-lg font-bold mb-1">THE STAR</span>
//                     <img src={cardImg} className="w-20" alt="타로" />
//                     <span className="w-full h-full object-cover rounded-lg border-2 border-gray-400">
//                       #{cardIdx + 1}
//                     </span>
//                   </div>
//                   {/* 뒷면 */}
//                   <div className="
//                     absolute inset-0
//                     bg-black rounded-lg border border-gray-600
//                     flex items-center justify-center
//                     [transform:rotateY(180deg)]
//                     [backface-visibility:hidden]
//                   ">
//                     <img src={cardImg} className="w-full h-full object-cover rounded-lg border-2 border-gray-400" alt="타로" />
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               // 빈 슬롯(공간 확보)
//               <div
//                 key={slotIdx}
//                 style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
//               ></div>
//             );
//           })}
//         </div>
//         {/* 아래쪽: 카드 선택 슬라이더 */}
//         <div className="flex items-center justify-center gap-8">
//           <button
//             onClick={onPrev}
//             disabled={scrollIdx === 0}
//             className="text-5xl text-white disabled:opacity-50"
//           >
//             &#8592;
//           </button>
//           {/* 슬라이더 트랙 (overflow-hidden & translateX로 움직임) */}
//           <div
//             className="relative overflow-hidden"
//             style={{
//               width: VISIBLE_CARDS * (CARD_WIDTH - OVERLAP) + OVERLAP,
//               height: CARD_HEIGHT,
//             }}
//           >
//             <div
//               className="flex transition-transform duration-300"
//               style={{ transform: `translateX(${trackOffset}px)` }}
//             >
//               {Array.from({ length: TOTAL_CARDS }).map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => onSelect(idx)}
//                   disabled={selected.includes(idx) || selected.length >= 3}
//                   className={`
//                     flex-shrink-0
//                     ${selected.includes(idx)
//                       ? "opacity-40 cursor-not-allowed"
//                       : "hover:scale-110"}
//                     transition-transform duration-200
//                   `}
//                   style={{
//                     width: CARD_WIDTH,
//                     height: CARD_HEIGHT,
//                     marginLeft: idx === 0 ? 0 : -OVERLAP,
//                   }}
//                 >
//                   <img
//                     src={cardImg}
//                     alt={`tarot ${idx}`}
//                     className="w-full h-full object-cover rounded-lg border-2 border-gray-400"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//           <button
//             onClick={onNext}
//             disabled={scrollIdx >= TOTAL_CARDS - VISIBLE_CARDS}
//             className="text-5xl text-white disabled:opacity-50"
//           >
//             &#8594;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import '../styles/CardPage.css';

// 카드에 대한 샘플 데이터
const initialCards = [
  { id: 1, front: 'Card 1', back: '뒷면 내용 1' },
  { id: 2, front: 'Card 2', back: '뒷면 내용 2' },
  { id: 3, front: 'Card 3', back: '뒷면 내용 3' },
  { id: 4, front: 'Card 4', back: '뒷면 내용 4' },
  { id: 5, front: 'Card 5', back: '뒷면 내용 5' },
  { id: 6, front: 'Card 6', back: '뒷면 내용 6' },
  { id: 7, front: 'Card 7', back: '뒷면 내용 7' },
  { id: 8, front: 'Card 8', back: '뒷면 내용 8' },
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
                <div className="card-front">{card.front}</div>
                <div className="card-back">{card.back}</div>
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
                <div className="card-front">{card.front}</div>
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