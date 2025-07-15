import { useState } from "react";
import '../css/chat.css'

export default ()=>{
    const [input, setInput] = useState("");
    const [commentList,setCommentList] = useState(['fefeefef','qqqwewqewqewqew','eefeffefeeffeefef']);

    const appendComment = (e)=>{
        e.preventDefault();
        if (!input.trim())return;
        setCommentList((prev)=>[...prev, input]);
        setInput('');   
    }

    return(
        <div className="chatContainer">
            <div className="chatBox">
                <div className="commentBoxContainer">
                {commentList.map((comment, idx) => (
                    <div key={idx} className="commentBox">
                        <div className="comment">{comment}</div>
                    </div>
                    
                ))}
                </div>
            </div>
            <form className="promptBox" onSubmit={appendComment}>
                <input className="prompt-input" placeholder="질문을 입력하세요" type="text" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                <button type="submit" className="prompt-send" >전송</button>
            </form>
        </div>
    )
}