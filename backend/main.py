import os
import json
import asyncio
import textwrap
from google import genai
from google.genai import types
from dotenv import load_dotenv

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

MAX_RETRY = 3

# API config
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=api_key)
grounding_tool = types.Tool(
    google_search=types.GoogleSearch()
)

def dedent(text):
    return textwrap.dedent(text).strip()

config = types.GenerateContentConfig(
    system_instruction=dedent("""
    # Role Definition
    - You are a tarot advisor who interprets tarot cards for users' everyday questions. Your goal is to provide light advice that can offer a little inspiration and a positive day.

    # Core Mission
    - You must connect the [Tarot Card Drawn] by the user with the [Question] they have asked and provide an interpretation.
    - Do not be bound solely by the traditional meanings of the cards; reinterpret them modernly and creatively to fit the context of the question.
    - All responses must naturally incorporate one or two sentences of specific, realistic advice that can be practiced in the real world, blended into the tarot interpretation.
    - If a repository or code is provided, replace the advice with guidance related to the code.

    # Tone and Style
    - Positive and Friendly: Use a warm tone that cheers on and encourages the user.
    - Concise and Clear: Deliver the answer summarized in a short text of 2-3 paragraphs. Avoid lengthy explanations.
    - Humor and Wit: If the question is clever (e.g., "What is the financial fortune of my Github project?"), respond with sense. However, be careful not to sound flippant or rude.
    - Avoid Making Definitive Statements: Instead of definitive statements like "It will definitely happen," use softer expressions such as "There seems to be a possibility of ~," "There is a tendency to ~," or "You can expect better results if you ~."
    
    # Response Rules
    - Do not draw a random tarot card until instructed by the user.
    """),
    temperature=1.2
)

class Context(BaseModel):
    type: str   # User or AI
    content: str

class Question(BaseModel):
    cards: list[int]
    context: list[Context] | None = None
    question: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "cards": [1, 2, 3],
                    "context": [
                        {
                            "type": "user",
                            "content": "첫 질문"
                        },
                        {
                            "type": "model",
                            "content": "첫 질문 답"
                        }
                    ],
                    "question": "두번째 질문",
                }
            ]
        }
    }


# Processing
tarot_idx = {
    0: "광대",
    1: "마법사",
    2: "여교황",
    3: "여황제",
    4: "황제",
    5: "교황",
    6: "연인",
    7: "전차",
    8: "힘",
    9: "은둔자",
    10: "운명의 수레바퀴",
    11: "정의",
    12: "매달린 남자",
    13: "죽음",
    14: "절제",
    15: "악마",
    16: "탑",
    17: "별",
    18: "달",
    19: "태양",
    20: "심판",
    21: "세계"
}


# API
app = FastAPI()

@app.post("/tarot/question")
async def tarot_question(question: Question):
    content = []

    if question.context:
        for context in question.context:
            content.append({
                "role": context.type,
                "parts": [
                    {
                        "text": context.content
                    }
                ]
            })

    content.append({
        "role": "user",
        "parts": [
            {
                "text": question.question
            }
        ]
    })

    content[0]['parts'][0]['text'] = dedent(f"""
    # 뽑은 타로 카드
    {' '.join(tarot_idx[card] for card in question.cards)}
    """) + "\n" + content[0]['parts'][0]['text']

    # print(json.dumps(content, indent=4, ensure_ascii=False))

    for i in range(MAX_RETRY):
        try:
            response = client.models.generate_content(
            model='gemini-2.5-pro',
            config=config,
            contents=content
            )
            break
        except genai.errors.ServerError as e:
            print(f"Try {i}, Error: {e}")
            await asyncio.sleep(1)
    return response.text


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

def test():
    question = Question(question="오늘 개발할때 주의해야 할 에러는 뭘까?", cards=[1, 2, 3])
    print(tarot_question(question))