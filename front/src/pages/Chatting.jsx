import { useState,useEffect,useRef } from "react";
import { useNavigate } from 'react-router-dom';

import '../css/chat.css'



export default ()=>{
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
        await sleep(1000)
        setCommentRecord((prev)=>[...prev,{type:"client",context:"말씀 해주셔서 감사합니다! 고민을 생각하며 카드 3장을 뽑아주세요"}])
        //await sendQuery(question,commentRecord);
    }
    
    
    useEffect(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [commentRecord]);
    

    const sendQuery = async (question,context) => {
        const payload = {
        cards: [1, 2, 3],
        context: commentRecord.map(c => ({ content: c.context, type: c.type })),
        question: input
    };

    const response = await fetch("http://localhost:8000/tarot/question", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        setCommentRecord((prev)=>[...prev,{type:'model',context:data}])
        console.log(data);
    };


    // {
    //     "cards": [1, 2, 3],
    //     "context": [
    //         {
    //             "type": "User",
    //             "content": "첫 질문"
    //         },
    //         {
    //             "type": "AI",
    //             "content": "첫 질문 답"
    //         }
    //     ]
    //     "question": "두번째 질문",
    // }

    return(
        <div className="chatContainer">
            <div className="chatBox" ref={scrollRef}>
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
                                {idx === 2 && <button onClick={() => {navigate('/select')}} className="gotoPickCardBtn">카드 뽑으러 가기</button>}
                            </div>
                        )
                    }
                    })}
                </div>
            </div>
            <form className="promptBox" onSubmit={appendComment}>
                <input className="prompt-input" placeholder="질문을 입력하세요" type="text" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                <button type="submit" className="prompt-send" >전송</button>
            </form>
        </div>
    )
}