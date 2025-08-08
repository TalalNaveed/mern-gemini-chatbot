import React from 'react';
import './ChatBubble.css';
import FeedbackButtons from './FeedbackButtons';
import companylogo from './logo.png';

export default function ChatBubble({ message, index, conversationId }) {
  const isUser = message.role === 'user';

  const formattedTime = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`bubble-row ${isUser ? 'user' : 'bot'}`}>
      <div className="avatar">
        {isUser ? (
          ''
        ) : (
          <img src={companylogo} alt="Logo" className="bot-logo" />
        )}
      </div>

      <div>
        <div className="bubble-meta">{formattedTime}</div>

        <div className={`chat-bubble ${isUser ? 'user-message' : 'bot-message'}`}>
          <div>{message.text}</div>
          {!isUser && message.executionTime && (
            <div className="execution-time">⏱ {message.executionTime}s</div>
          )}
        </div>

        {/* ✅ Feedback below the message bubble */}
        {!isUser && (
          <FeedbackButtons
            conversationId={conversationId}
            messageIndex={index}
            feedback={message.feedback}
            messageText={message.text}
          />
        )}
      </div>
    </div>
  );
}
