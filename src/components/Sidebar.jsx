import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE;

export default function Sidebar({ setCurrentConversationId, refreshSidebar }) {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  const fetchConversations = async () => {
    try {
      const res = await fetch(`${API_BASE}/conversations`);
      const data = await res.json();
      setConversations(data);
    } catch (err) {
      console.error('Failed to load conversations:', err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [refreshSidebar]);

  const handleSelectConversation = (id) => {
    setCurrentConversationId(id);
    navigate('/');
  };

  const handleNewChat = async () => {
    const res = await fetch(`${API_BASE}/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `Chat ${new Date().toLocaleTimeString()}`,
        messages: [],
      }),
    });

    const convo = await res.json();
    setCurrentConversationId(convo._id);
    await fetchConversations();
    navigate('/');
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // prevent opening the chat
    try {
      await fetch(`${API_BASE}/conversations/${id}`, {
        method: 'DELETE',
      });

      // Refresh list
      fetchConversations();

      // Optional: clear chat if it was open
      setCurrentConversationId((prev) => (prev === id ? null : prev));
    } catch (err) {
      console.error('Failed to delete conversation:', err);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={handleNewChat}>
          New Chat
        </button>
      </div>

      <div className="sidebar-section-title">Navigation</div>
      <ul className="sidebar-chat-list">
        <li>
          <Link to="/dashboard" className="sidebar-chat-item">
            Performance Dashboard
          </Link>
        </li>
      </ul>

      <div className="sidebar-section-title">Chats</div>
      <ul className="sidebar-chat-list">
        {conversations.map((chat) => (
          <li key={chat._id} className="sidebar-chat-entry">
            <button className="sidebar-chat-history" onClick={() => handleSelectConversation(chat._id)}>
              {chat.title || 'Untitled Chat'}
            </button>
            <button className="delete-chat-btn" onClick={(e) => handleDelete(chat._id, e)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
