import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AskQuestionForm from "./components/AskQuestionForm";
import QuestionDetail from "./components/QuestionDetail";
import QuestionList from "./components/QuestionList";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('access_token')
  );
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setShowRegister(false);
  };

  return (
    <Router>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#121212',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 40px',
            alignItems: 'center',
          }}
        >
          <h1 style={{ margin: 0 }}>StackIt 🧠</h1>

          <div style={{ display: 'flex', gap: '12px' }}>
            {!isAuthenticated && (
              <button
                onClick={() => setShowRegister(!showRegister)}
                style={{
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                {showRegister ? 'Login' : 'Register'}
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#e11d48',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30px',
            paddingBottom: '40px',
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <>
                    <QuestionList />
                
                  </>
                ) : showRegister ? (
                  <RegisterForm setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <LoginForm setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/questions/:id"
              element={
                isAuthenticated ? (
                  <QuestionDetail />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
