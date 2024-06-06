import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KantinePage from './components/KantinePage';
import LoginPage from './components/LoginPage';
import Handlekurv from './components/Handlekurv';
import Kvittering from './components/kvittering';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
        <NavBar />
      <Routes>
        <Route path="/" element={<KantinePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/handlekurv' element={<Handlekurv />}  />
        <Route path='/kvittering' element={<Kvittering />} />
      </Routes>
    </Router>
  );
}

export default App;
