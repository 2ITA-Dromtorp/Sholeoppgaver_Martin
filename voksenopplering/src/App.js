// App.js

import React, { useState } from 'react';
import CourseList from './CourseList';
import RegistrationForm from './RegistrationForm';
import './App.css';
import Home from './home';
import { Route, Routes } from 'react-router-dom';
import Info from './info.js';
import FormPopup from './FormPopup';

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/info/:fag' element={<Info />} />
      <Route path='/info/:fag/formpopup' element={<FormPopup />} />
    </Routes>
    
  );
}

export default App;
