// Result.jsx
import '../css/result.css';

import { useState,useEffect,useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


export default function Result() {
    let result="";
    const sendTarotRequest = async () => {
        // 선택된 카드들의 ID만 추출

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

            result = await response.json();

            // 다음 페이지로 이동하는 로직을 여기에 추가
            console.log("2초 대기 후 다음 페이지로 이동합니다.");
            
            } catch (error) {
            console.error('요청 실패:', error);
            }

        };
        
  const scrollRef = useRef(null);
  const resultData = useLocation().state;
  // 더미 데이터(실제 데이터로 대체 가능)
  const cards = [
    { name: resultData.cards[0].name, image: resultData.cards[0].backImage },
    { name: resultData.cards[1].name, image: resultData.cards[1].backImage },
    { name: resultData.cards[2].name, image: resultData.cards[2].backImage }
  ];
  

  function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [commentRecord,setCommentRecord] = useState([]);
  const appendComment = async (e)=>{
        const question = input;
        e.preventDefault();
        if (!input.trim()) return;
        setCommentRecord((prev)=>[...prev, {type:"user",context:input}]);
        setInput('');
        setCommentRecord((prev)=>[...prev,{type:"client",context:"답변을 생각하고 있습니다..."}])
        await sleep(1000)
        setCommentRecord((prev)=>[...prev.slice(0,prev.length-1),{type:"client",context:"답변은 안해."}])
        //await sendQuery(question,commentRecord);
    }
    useEffect(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [commentRecord]);

  const summary = result;

  return (
    <div className="result-bg">
      {/* 채팅 메시지 영역 */}
      <div className="result-frame" ref={scrollRef}>
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
        <div className="commentBoxContainer">
        {commentRecord.map((comment, idx) => {
            if(comment.type === "user"){
                return(
                    <div key={idx} className="commentBox">
                        <div className="comment userComment">{comment.context}</div>
                    </div>
                )
            }
            else{
                return(
                    <div key={idx} className="commentBox">
                        <div className="comment modelComment">{comment.context}</div>
                    </div>
                )
            }
            })}
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