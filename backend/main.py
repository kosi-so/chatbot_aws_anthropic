from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bedrock_client import query_bedrock_claude
import time

app = FastAPI()
chat_history = []          # This will store the chat history

# Middleware to handle CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://chatbot-frontend-public.s3-website-ap-southeast-2.amazonaws.com"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatInput(BaseModel):
    prompt: str

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/chat")
def chat(input: ChatInput):
    global chat_history

    if chat_history and chat_history[-1]["role"] == "user":
    # If the last message was also from user, replace it
        chat_history[-1] = {"role": "user", "content": input.prompt}
    else:
        chat_history.append({"role": "user", "content": input.prompt})

    try:
        reply = query_bedrock_claude(chat_history)
    except Exception as e:
        print("Error calling Bedrock:", e)
        return {"response": f"[Error: {e}]"}  # Surface the error for testing

    if reply:
        chat_history.append({"role": "assistant", "content": reply})
    else:
        chat_history.append({"role": "assistant", "content": "[No response received]"})

    return {"response": reply}
