import { useState,useEffect,useRef } from "react";
import { useNavigate } from 'react-router-dom';

import '../css/chat.css'



export default ()=>{
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [commentRecord,setCommentRecord] = useState([{type:"model",context:"안녕하세요! 타로를 봐드리겠습니다. 고민거리를 말해주세요!"}]);
    const scrollRef = useRef(null);
    const appendComment = async (e)=>{
        setIsLoading(true);
        e.preventDefault();
        if (!input.trim()) return;
        setCommentRecord((prev)=>[...prev, {type:"user",context:input}]);
        setInput('');
        setCommentRecord((prev)=>[...prev,{type:"client",context:"답변을 생각하고 있습니다..."}])
        await sleep(1000)
        setCommentRecord((prev)=>[...prev.slice(0,prev.length-1),{type:"client",context:"말씀 해주셔서 감사합니다! 고민을 생각하며 카드 3장을 뽑아주세요"}])
        setIsLoading(false);
    }
    
    
    useEffect(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        if(commentRecord.length == 3){
            setIsLoading(true);
        }
    }, [commentRecord]);


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
                                {comment.context=="말씀 해주셔서 감사합니다! 고민을 생각하며 카드 3장을 뽑아주세요" && <button onClick={() => {navigate("/select", { state: commentRecord[1].context });}} className="gotoPickCardBtn">카드 뽑으러 가기</button>}
                            </div>
                        )
                    }
                    })}
                </div>
            </div>
            <form className="promptBox" onSubmit={appendComment}>
                <input className="prompt-input" placeholder="질문을 입력하세요" type="text" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                <button type="submit" className="prompt-send" disabled={isLoading}>
                    {isLoading ? "..." : "전송"}
                </button>
            </form>
        </div>
    )
}