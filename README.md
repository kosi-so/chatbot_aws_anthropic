# Claude Chatbot with AWS Bedrock + React + FastAPI

This is a full-stack AI chatbot built using **Anthropic's Claude model** via **AWS Bedrock**, with a **React frontend** and **FastAPI backend**. It supports multi-turn memory, a REST API, and secure environment-based credential loading.

---

## ⚙️ Features

- 💬 Conversational interface with Claude 3.5 (Sonnet) via Bedrock
- 🌐 FastAPI backend with chat memory and Claude API integration
- ⚛️ React frontend with live chat display
- 🔐 .env configuration for secure credentials
- 🔁 Graceful retry and throttling handling
- 🧠 Session memory support (in-memory)

---
## 📁 Project Structure

chatbot_aws_anthropic/ \
│\
├── backend/ # FastAPI app \
│ ├── main.py # API endpoints + CORS + chat history\
│ ├── bedrock_client.py # Claude 3.5 message API handler\
│ └── .env # AWS credentials\
│\
├── frontend/ # React app\
│ ├── src/\
│ │ └── App.js # Chat UI logic\
│ └── package.json\
│\
└── README.md\