import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KantinePage from './components/KantinePage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<KantinePage />} />
      </Routes>
    </Router>
  );
}

export default App;
