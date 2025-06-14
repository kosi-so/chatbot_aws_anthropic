from fastapi import FastAPI, Request
from pydantic import BaseModel
from bedrock_client import query_bedrock_claude

app = FastAPI()

class ChatInput(BaseModel):
    prompt: str

@app.post("/chat")
def chat(input: ChatInput):
    reply = query_bedrock_claude(input.prompt)
    return {"response": reply}