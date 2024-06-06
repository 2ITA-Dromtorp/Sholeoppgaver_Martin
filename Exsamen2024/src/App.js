import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KantinePage from './components/KantinePage';
import LoginPage from './components/LoginPage';
import Handlekurv from './components/Handlekurv';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<KantinePage />} />
        <Route path='/handlekurv' element={<Handlekurv />}  />
      </Routes>
    </Router>
  );
}

export default App;
