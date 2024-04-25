import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import UtstyrPage from './utstyr';

function App({ pageTitle, tableHeaders, data }) {
  return (
    <>
      <div>
        <h1>{pageTitle}</h1>
          <div>
            <h1>Utstyr</h1>
            <Outlet />
          </div>
      </div>
      <Routes>
        <Route path="/" element={<UtstyrPage />} />
      </Routes>
    </>
  );
}

export default App;
