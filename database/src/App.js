import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import UtstyrPage from './utstyr';
import ElevPage from './elev';
import Loggin from './loginform';
import './style.css'; // Import the CSS file
import './elevStyles.css'; // Import the CSS file




function App({ pageTitle, tableHeaders, data }) {
  return (
    <>
      <div>
        <h1>{pageTitle}</h1>
          <div>
            <Outlet />
          </div>
      </div>
      <Routes>
        <Route path="/" element={<UtstyrPage />} />
        <Route path='/login' element={<Loggin />} />
        <Route path="/elev" element={<ElevPage />} />
      </Routes>
    </>
  );
}

export default App;
