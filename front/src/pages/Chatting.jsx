import { useState,useEffect,useRef } from "react";
import '../css/chat.css'



export default ()=>{
    const [input, setInput] = useState("");
    const [commentRecord,setCommentRecord] = useState([{type:"model",context:"안녕하세요! 타로를 봐드리겠습니다. 어떤운을 보시겠어요?(예: 연애운,학업운,취업운,금전운 등)"}]);
    const scrollRef = useRef(null);
    const appendComment = (e)=>{
        e.preventDefault();
        if (!input.trim()) return;
        setCommentRecord((prev)=>[...prev, {type:"user",context:input}]);

        setInput('');
    }
    
    
    useEffect(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [commentRecord]);
    

    const sendQuery = async () => {
        const payload = {
        cards: [1, 2, 3],
        context: commentRecord,
        question: input
    };

    const response = await fetch("", {
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
                    }else{
                        return(
                            <div key={idx} className="commentBox">
                                <div className="comment modelComment">{comment.context}</div>
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