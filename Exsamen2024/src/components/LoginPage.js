import React, { useState } from 'react';
import '../loginStyles.css'; // Import the CSS file

const users = [
  { username: 'Admin', password: 'Admin123' },
  { username: 'Elev', password: 'Skole123' },
  // Add more users as needed
];

function LoginPage({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem('authToken', 'dummyToken'); // Store a dummy token
      window.location.reload(); // Reload the page to reflect the login status
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default LoginPage;
