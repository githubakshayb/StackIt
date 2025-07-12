import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage('❌ Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/auth/register/', {
        username,
        password,
      });

      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      setIsAuthenticated(true);
      setMessage('✅ Registered successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Registration failed');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2>Register to StackIt</h2>
        {message && <p className="status-message">{message}</p>}
        <form onSubmit={handleRegister}>
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
          <input
            type="password"
            placeholder="🔁 Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button type="submit">📝 Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
