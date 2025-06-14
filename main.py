from fastapi import FastAPI, Request
from pydantic import BaseModel
from bedrock_client import query_bedrock_claude

app = FastAPI()
chat_history = []          # This will store the chat history
 
class ChatInput(BaseModel):
    prompt: str

@app.post("/chat")
def chat(input: ChatInput):
    global chat_history

    # Add new user message to chat history
    chat_history.append({"role": "user", "content": input.prompt})

    # Query model with the updated chat history
    reply = query_bedrock_claude(chat_history)

    # Add model's reply to chat history
    chat_history.append({"role": "assistant", "content": reply})

    return {"response": reply}