Gemini Chatbot with Dashboard
A full-stack MERN + Python chatbot application featuring a ChatGPT-style interface, Gemini AI-powered responses, and a real-time performance dashboard.
The project includes conversation history, thumbs up/down feedback, optional comment collection, and analytics tracking.

🚀 Features
💬 Chatbot UI
Clean, ChatGPT/Chainlit-inspired interface

Real-time conversation updates with smooth scrolling

Execution time displayed for each bot response

Thumbs up/down feedback system for responses

Feedback input box when thumbs down is given

Conversation history saved in MongoDB

Loads past conversations from sidebar

Input bar stays fixed at bottom while scrolling

📊 Dashboard
Average response time

Failed response count

Total Q&A interactions

User feedback breakdown (Positive / Neutral / Negative)

Weekly interaction chart

Recent feedback table (scrollable, all-time feedback)

Responsive layout & scalable metrics section

🛠 Backend
Node.js + Express REST API

MongoDB + Mongoose for data storage

Gemini AI Integration (Google Generative AI) via Python backend

Stores & retrieves full conversation history

Aggregated analytics for dashboard

⚙️ Technologies Used
Frontend
React.js (JavaScript)
HTML5 + CSS3
React Hooks (useState, useEffect, useRef)
lucide react
Chart.js (react-chartjs-2)
Flexbox & Responsive Design

Backend
Node.js

Express.js

REST API principles

MongoDB (NoSQL database)

Mongoose (MongoDB ORM)

AI Integration
Python 3

LangChain (langchain.chat_models)

LangGraph (state graph for chat flow)

Google Gemini API (google_genai:gemini-1.5-flash)

APIs
Custom REST API endpoints for:

Creating, reading, deleting conversations

Adding messages

Updating feedback with comments

Fetching dashboard metrics

Generating Gemini AI replies

📝 License
MIT License

👨‍💻 Author
Muhammad Talal Naveed
MERN + AI Developer
