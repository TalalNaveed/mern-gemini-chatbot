import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import './ChatWindow.css';
import companyLogo from './logo.png';

const API_BASE = process.env.REACT_APP_API_BASE;

export default function ChatWindow({ currentConversationId, setCurrentConversationId, triggerSidebarRefresh }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!currentConversationId) {
      setMessages([]);
      return;
    }

    const loadConversation = async () => {
      try {
        const res = await fetch(`${API_BASE}/conversations/${currentConversationId}`);
        const convo = await res.json();
        setMessages(convo.messages || []);
      } catch (err) {
        console.error('Failed to load conversation:', err);
      }
    };

    loadConversation();
  }, [currentConversationId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    };

    let conversationId = currentConversationId;

    if (!conversationId) {
      const res = await fetch(`${API_BASE}/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Chat ${new Date().toLocaleTimeString()}`,
          messages: [userMessage],
        }),
      });

      const convo = await res.json();
      conversationId = convo._id;
      setCurrentConversationId(convo._id);
      setMessages([userMessage]);
      triggerSidebarRefresh();
    } else {
      setMessages(prev => [...prev, userMessage]);
      await fetch(`${API_BASE}/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userMessage),
      });
    }

    setIsTyping(true);
    const start = Date.now();
    const userInput = input;
    setInput('');

    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }), // ✅ correct key
      });


      const data = await res.json();

      const botMessage = {
        role: 'bot',
        text: data.reply || '⚠️ Failed to generate a response.',
        executionTime: ((Date.now() - start) / 1000).toFixed(2),
        timestamp: new Date().toISOString(),
        success: !!data.reply,
        feedback: null,
      };

      setMessages(prev => [...prev, botMessage]);

      await fetch(`${API_BASE}/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(botMessage),
      });

    } catch (err) {
      console.error('Gemini request failed:', err);
      const errorMessage = {
        role: 'bot',
        text: '⚠️ Failed to generate a response.',
        executionTime: ((Date.now() - start) / 1000).toFixed(2),
        timestamp: new Date().toISOString(),
        success: false,
        feedback: null,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <ChatBubble
            key={i}
            message={msg}
            index={i}
            conversationId={currentConversationId}
          />
        ))}

        {isTyping && (
          <div className="bubble-row bot">
            <div className="avatar">
              <img src={companyLogo} alt="Logo" className="bot-logo" />
            </div>
            <div className="chat-bubble bot-message">
              <span className="typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          className="chat-input"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button className="send-button" onClick={handleSend}>
          ↑
        </button>
      </div>
    </div>
  );
}
