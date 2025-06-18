# AWS Bedrock + Claude Chatbot ☁️🤖

A full-stack chatbot using AWS Bedrock (Anthropic Claude) with a React frontend deployed via S3, and a FastAPI backend hosted on ECS Fargate. CI/CD is managed with GitHub Actions.

---

## ⚙️ Features

- **React SPA** for a sleek chat UI deployed to S3 + CloudFront  
- **FastAPI backend** running on ECS, serving POST `/chat` requests to Claude via Bedrock  
- Request logging and simple conversation history  
- Strict **CORS** setup between frontend and backend  
- Fully automated **CI/CD with GitHub Actions** for both backend container and frontend build

---


## 📁 Project Structure

chatbot_aws_anthropic/ \
├── .github/workflows/deploy.yml  # CI/CD pipeline \
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


---

## ✅ Prerequisites

- AWS account with permissions for: ECS, ECR, S3, CloudFront, IAM, Bedrock
- Bedrock Anthropic Claude access
- GitHub repository secrets:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
  - `ECR_BACKEND_REPO` 
  - `ECS_CLUSTER` 
  - `ECS_SERVICE` 
  - `TASK_DEFINITION_FAMILY` 
  - `S3_BUCKET_NAME` 

---

## 🛠️ Setup

### 1. Backend

```bash
cd backend
uvicorn main:app --reload --port 8000
```

**visit:** http://localhost:8000/docs to test

### 2. Frontend

```bash
cd frontend
npm install
npm run build
```

### 3. AWS Infrastructure
- Ensure these are created:

    - ECR repository
    - ECS Fargate cluster + service
    - Task definition referencing the image
    - S3 bucket for frontend hosting
    - IAM task role with bedrock:InvokeModel access

## 🚀 CI/CD: GitHub Actions

**Workflow:** `.github/workflows/deploy.yml`

### 🔧 Backend Steps:
- Checkout code  
- Login to ECR  
- Build and push Docker image  
- Register and update ECS task definition and service  

### 🎨 Frontend Steps:
- Install dependencies  
- Build React app  
- Sync to S3 bucket  

---

## 🔒 IAM Permissions

**ECS Task Role must have:**
- `AmazonECSTaskExecutionRolePolicy`
- Inline policy (e.g., `BedrockInvokeModelPolicy`):

```json
{
  "Effect": "Allow",
  "Action": "bedrock:InvokeModel",
  "Resource": "<Claude-model-ARN>"
}
```

## 💡 Usage

1. Push to `main` branch.
2. GitHub Actions CI/CD pipeline automatically:
   - Builds and pushes the backend Docker image to ECR.
   - Registers and updates the ECS service with the new task definition.
   - Builds the React frontend and syncs it to the S3 bucket.
3. Access the chatbot:
   - Via the **S3/CloudFront** URL for the frontend.
   - Via `/docs` on the backend **Load Balancer URL** for API testing.

---

## 🛠️ Troubleshooting

- **500 Internal Server Error**  
  → Check ECS container logs in the AWS Console. Confirm IAM roles have necessary permissions (especially for Bedrock access).

- **CORS Error**  
  → Ensure `allow_origins` in `CORSMiddleware` matches the deployed S3 frontend URL.

- **ELB Health Check Failed**  
  → Make sure your FastAPI backend listens on port `8000` and the Docker container exposes that port.

- **Pipeline Failures**  
  → Double-check `TASK_DEFINITION_FAMILY`, IAM roles, and GitHub secrets (`AWS_ACCESS_KEY_ID`, `ECR_BACKEND_REPO`, etc.).

---

## 🧪 Local Development

```bash
# Run the backend locally
cd backend
uvicorn main:app --reload

# Run the frontend locally
cd frontend
npm install
npm start
```

## 📄 License & Credits

This project is licensed under the **MIT License**.

### Credits

- Built with:
  - [FastAPI](https://fastapi.tiangolo.com/)
  - [React](https://reactjs.org/)
  - [Amazon ECS](https://aws.amazon.com/ecs/)
  - [Amazon S3](https://aws.amazon.com/s3/)
  - [AWS Bedrock](https://docs.aws.amazon.com/bedrock/)
  - [Anthropic Claude](https://www.anthropic.com/index/claude)
  - [GitHub Actions](https://docs.github.com/en/actions)

Inspired by deployment patterns for AWS Bedrock and LLM-based chatbots.

