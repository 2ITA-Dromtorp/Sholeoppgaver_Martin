// LoginPopup.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginPopup.css'; // Import the CSS file for styling
 
function LoginPopup({ onClose, onLogin }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleclick = () => {
        onLogin(password, username)
    }
  return (
    <div className="login-popup">
      <span className="close-button" onClick={onClose}>&times;</span>
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onInput={e => setUsername(e.target.value)}/>
 
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onInput={e => setPassword(e.target.value)}/>
 
        <button onClick={handleclick}>Login</button>
      </form>
    </div>
  );
}
 
LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};
 
export default LoginPopup;