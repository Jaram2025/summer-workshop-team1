// Result.jsx
import { useLocation, useNavigate } from "react-router-dom";
import '../css/result.css';

export default function Result() {
  // 더미 데이터(실제 데이터로 대체 가능)
  const cards = [
    { name: "THE FOOL", image: "/card1.png" },
    { name: "TEMPERANCE", image: "/card2.png" },
    { name: "DEATH", image: "/card3.png" }
  ];

  const summary = "지금은 큰 변화의 시기입니다. 두려워하지 말고 새로운 시작을 위해 균형잡힌 마음으로 나아가세요. 과거에 얽매이지 말고 미래를 향해 용기있게 발걸음을 내딛으시길 바랍니다.";

  return (
    <div className="result-bg">
      {/* 채팅 메시지 영역 */}
      <div className="result-frame">
        <div className="result-cards-row">
          {/* 카드 표시와 종합 해석 */}
          <div className="result-card">
            <div className="text-message" style={{ marginBottom: '1rem' }}>선택하신 카드들을 해석해드릴게요!</div>
            <div className="cards-container">
              {cards.map((card, idx) => (
                <div key={idx} className="card-item">
                  <img src={card.image} alt={card.name} className="result-card-img"/>
                  <div className="result-card-name">{card.name}</div>
                </div>
              ))}
            </div>
            <div className="text-message" style={{ marginTop: '1.5rem' }}>💫 {summary}</div>
          </div>
        </div>
      </div>
      
      {/* 하단 입력창 */}
      <div className="result-summary-title">
        <div className="result-summary-text">
          <input 
            type="text" 
            placeholder="질문을 입력하세요"
            readOnly
          />
          <button>전송</button>
        </div>
      </div>
    </div>
  );
}