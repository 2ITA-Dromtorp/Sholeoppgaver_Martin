// Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import FormPopup from './FormPopup'; // Import the FormPopup component
import './App.css';

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (enteredUsername, enteredFullName) => {
    setIsLoggedIn(true);
    setUsername(enteredUsername);
    setFullName(enteredFullName);
    setShowLogin(false);
    setConfirmationMessage(`Welcome, ${enteredFullName}! You are now logged in.`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setFullName('');
    setConfirmationMessage('');
  };

  const handleFormSubmit = (formData) => {
    // Handle form submission logic
    console.log('Form submitted:', formData);
  };

  const loginButtonText = isLoggedIn ? `Welcome, ${fullName}!` : 'Login';

  return (
    <div className='container'>
      <div className='header'>
        <h1>Voksenopplæring på Drømtorp VGS</h1>
        <div>
          {isLoggedIn ? (
            <div>
              <span>{fullName}</span>
              <button className="login-button" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <button className="login-button" onClick={() => setShowLogin(true)}>
                {loginButtonText}
              </button>
              <button className="form-button" onClick={() => setShowForm(true)}>
                Open Form
              </button>
            </>
          )}
        </div>
      </div>
      {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}

      <div className='middle'>
        <div className='LeftMid'>
          <div className='Norsk' onClick={() => navigate('/info/Grunnleggende datakunnskap')}>
            Grunnleggende datakunnskap
          </div>
          <div className='Heimkunskap' onClick={() => navigate('/info/Kroppsøving')}>
            Kroppsøving
          </div>
        </div>
        <div className='RightMid'>
          <div className='Norsk' onClick={() => navigate('/info/norsk')}>
            Norsk
          </div>
          <div className='Heimkunskap' onClick={() => navigate('/info/Heimkunskap')}>
            Heimkunskap
          </div>
        </div>
      </div>
      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
      {showForm && <FormPopup onClose={() => setShowForm(false)} onSubmit={handleFormSubmit} />}
    </div>
  );
}

export default Home;
