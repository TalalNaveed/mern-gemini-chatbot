#💬 Gemini Chatbot with Dashboard
A full-stack MERN + Python chatbot application featuring a ChatGPT-style interface, Gemini AI-powered responses, and a real-time performance dashboard.
The project includes conversation history, thumbs up/down feedback, optional comment collection, and analytics tracking.
##🚀 Features

##Chatbot UI

ChatGPT/Chainlit-inspired, clean, user-friendly design

Real-time chatbot conversation with smooth auto-scrolling

Execution time display for every bot response

Thumbs up/down feedback with optional comment box on thumbs down

Fixed input bar at bottom of screen

Conversation history stored in MongoDB and loaded from sidebar

##Performance Dashboard

Average response time tracking

Failed responses count

Total Q&A interactions

User feedback breakdown (Positive / Neutral / Negative)

Weekly interactions bar chart

All-time feedback table with scroll support

Space for adding more metrics in the future

##Backend Functionality

REST API endpoints for conversation and feedback management

MongoDB storage for conversations, feedback, and analytics

AI response generation using Google Gemini API via Python

Node.js–Python bridge for AI message generation

Dashboard metrics aggregation

##🛠️ Built With
##Frontend

React.js – UI rendering & state management

HTML5 – Markup structure

CSS3 – Styling with custom responsive design

Chart.js & react-chartjs-2 – Data visualization

##Backend

Node.js – Backend runtime environment

Express.js – REST API server

MongoDB – NoSQL database

Mongoose – MongoDB ORM

##AI Integration

Python 3 – AI processing layer

LangChain – Chat model integration

LangGraph – State graph for chat flow

Google Generative AI API (gemini-1.5-flash)

##APIs
Custom REST API endpoints for:

Creating, reading, deleting conversations

Adding messages

Updating feedback with comments

Fetching dashboard metrics

Generating Gemini AI replies

##🎨 Key Components
Chat Interface

Avatar-based message bubbles

Smooth scrolling with useRef

Typing indicator animation

Fixed bottom input with send button

##Dashboard

Responsive card layout for metrics

Scrollable feedback table with timestamps & comments

Dynamic pie chart for feedback categories

Weekly bar chart for user activity

##Backend Logic

Modular API routes (routes/chat.js, routes/gemini_generate.js)

Feedback storage & retrieval

Execution time calculation for each AI response

##📸 Screenshots
<img width="2228" height="1200" alt="image" src="https://github.com/user-attachments/assets/518f55e8-484c-406f-acf9-d7c0dd8fecf2" />
<img width="1773" height="1200" alt="image" src="https://github.com/user-attachments/assets/3df713b4-9039-4777-bfa3-e0ecb8efa814" />


##👨‍💻 Author
Muhammad Talal Naveed
MERN + AI Developer
