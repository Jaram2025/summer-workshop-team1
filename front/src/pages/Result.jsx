// Result.jsx
import '../css/result.css';

import { useState,useEffect,useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


export default function Result() {
    const [result, setResult] = useState("");
<<<<<<< HEAD
    const [isLoading,setIsLoading] = useState(false);
    const sendTarotRequest = async (requestBody) => {
        // 선택된 카드들의 ID만 추출
        setIsLoading(true);

        console.log("백엔드로 전송할 데이터:", requestBody);
=======
    const sendTarotRequest = async () => {
        console.log("백엔드로 전송할 데이터:", requestBody); 
>>>>>>> bdaec6efc23458c5871ac641d251168506c3903e

        try {
            const response = await fetch('http://prox.g4tsby.xyz:8000/tarot/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json(); // result = 를 const data = 로 변경
            
            
            } catch (error) {
            console.error('요청 실패:', error);
            }
            finally{
              setIsLoading(false);
            }

        };

  const scrollRef = useRef(null);
  const resultData = useLocation().state;


    const cards = [
        { name: resultData.cards[0].name, image: resultData.cards[0].backImage },
        { name: resultData.cards[1].name, image: resultData.cards[1].backImage },
        { name: resultData.cards[2].name, image: resultData.cards[2].backImage }
    ];
    
    // This is the correct place for the initial API call
    useEffect(() => {

    const cardDesc = sendTarotRequest({
      cards: resultData.cards.map(card => card.id),
      question: resultData.question,
    });
    setResult(cardDesc);
  }, []);

    const [input, setInput] = useState("");
    const [commentRecord,setCommentRecord] = useState([]);
    const appendComment = async (e)=>{
          e.preventDefault();
          if (!input.trim()) return;
          setCommentRecord((prev)=>[...prev, {type:"user",content:input}]);
          setInput('');
          setCommentRecord((prev)=>[...prev,{type:"model",content:"답변을 생각하고 있습니다..."}])
          const modelComment = await sendTarotRequest({
            cards: resultData.cards.map(card => card.id),
            context:commentRecord,
            question: resultData.question,
          });
          setCommentRecord((prev)=>[...prev.slice(0,prev.length-1),{type:"model",content:modelComment}])
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
            <div className="text-message" style={{ marginTop: '1.5rem' }}>💫 {summary?summary:"카드를 해석중입니다..."}</div>
          </div>
        </div>
        <div className="commentBoxContainer">
        {commentRecord.map((comment, idx) => {
            if(comment.type === "user"){
                return(
                    <div key={idx} className="commentBox">
                        <div className="comment userComment">{comment.content}</div>
                    </div>
                )
            }
            else{
                return(
                    <div key={idx} className="commentBox">
                        <div className="comment modelComment">{comment.content}</div>
                    </div>
                )
            }
            })}
        </div>

      </div>
      
      {/* 하단 입력창 */}
        <form className="promptBox" onSubmit={appendComment}>
            <input className="prompt-input" placeholder="질문을 입력하세요" type="text" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
            <button disabled={isLoading} type="submit" className="prompt-send" >{isLoading?'...':'전송'}</button>
        </form>
    </div>
  );
}