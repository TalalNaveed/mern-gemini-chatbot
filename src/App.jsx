import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [refreshSidebar, setRefreshSidebar] = useState(0); // 🚀 trigger refetch

  return (
    <Router>
      <div className="app-container">
        <Sidebar
          setCurrentConversationId={setCurrentConversationId}
          refreshSidebar={refreshSidebar}
        />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
              <ChatWindow
                key={currentConversationId || 'new'}  // 👈 force remount on new chat
                currentConversationId={currentConversationId}
                setCurrentConversationId={setCurrentConversationId}
                triggerSidebarRefresh={() => setRefreshSidebar(prev => prev + 1)}
              />

              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
