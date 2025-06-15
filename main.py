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
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,  
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatInput(BaseModel):
    prompt: str

@app.post("/chat")
def chat(input: ChatInput):
    global chat_history

    # Add new user message to chat history
    chat_history.append({"role": "user", "content": input.prompt})

    time.sleep(1.2)  # Simulate a delay for the model to process

    # Query model with the updated chat history
    reply = query_bedrock_claude(chat_history)

    # Add model's reply to chat history
    chat_history.append({"role": "assistant", "content": reply})

    return {"response": reply}

