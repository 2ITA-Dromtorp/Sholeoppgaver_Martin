// App.js

import React, { useState } from 'react';
import CourseList from './CourseList';
import RegistrationForm from './RegistrationForm';
import './App.css';
import Home from './home';
import { Route, Routes } from 'react-router-dom';
import Info from './info.js';

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/info/:fag' element={<Info />} />
    </Routes>
    
  );
}

export default App;
