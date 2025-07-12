import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password,
      });

      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      setMessage('✅ Login successful!');
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
      setMessage('❌ Login failed.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login to StackIt</h2>
        {message && <p className="status-message">{message}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔐 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">🚀 Login</button>
        </form>

      </div>
    </div>
  );
};

export default LoginForm;
