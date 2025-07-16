// Result.jsx
import '../css/result.css';

import { useState,useEffect,useRef } from "react";
import { useNavigate } from 'react-router-dom';


export default function Result() {
  // 더미 데이터(실제 데이터로 대체 가능)
  const cards = [
    { name: "THE FOOL", image: "/card1.png" },
    { name: "TEMPERANCE", image: "/card2.png" },
    { name: "DEATH", image: "/card3.png" }
  ];

  function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [commentRecord,setCommentRecord] = useState([{type:"model",context:"안녕하세요! 타로를 봐드리겠습니다. 고민거리를 말해주세요!"}]);
    const scrollRef = useRef(null);
  const appendComment = async (e)=>{
        const question = input;
        e.preventDefault();
        if (!input.trim()) return;
        setCommentRecord((prev)=>[...prev, {type:"user",context:input}]);
        setInput('');
        setCommentRecord((prev)=>[...prev,{type:"client",context:"답변을 생각하고 있습니다..."}])
        await sleep(1000)
        setCommentRecord((prev)=>[...prev.slice(0,prev.length-1),{type:"client",context:"말씀 해주셔서 감사합니다! 고민을 생각하며 카드 3장을 뽑아주세요"}])
        //await sendQuery(question,commentRecord);
    }

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
        <form className="promptBox" onSubmit={appendComment}>
            <input className="prompt-input" placeholder="질문을 입력하세요" type="text" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
            <button type="submit" className="prompt-send" >전송</button>
        </form>
    </div>
  );
}