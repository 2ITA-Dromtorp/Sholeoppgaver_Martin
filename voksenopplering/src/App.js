// App.js

import React, { useState } from 'react';
import CourseList from './CourseList';
import RegistrationForm from './RegistrationForm';
import './App.css';


function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
  };
  const coursesData = [
    {
      id: 1,
      title: 'Grunnleggende datakunnskap',
      description: 'Innføring i datamaskinbruk og grunnleggende programvare.',
    },
    {
      id: 2,
      title: 'Norsk',
      description: 'Forbedre skriftlig og muntlig norsk ferdigheter.',
    },
    {
      id: 3,
      title: 'Heimkunnskap',
      description: 'Lære om matlaging, husarbeid og generell husholdning.',
    },
    {
      id: 4,
      title: 'Kroppsøving',
      description: 'Fysisk trening og helsefremmende aktiviteter.',
    },
  ];

  return (
    <div className='container'>
      <div className='header'>
        <h1>Voksenopplæring på Drømtorp VGS</h1>
      </div>
      <div className='middle'>
          <div className='LeftMid'>
           
          </div>
          <div className='RightMid'>
           <div className='Norsk'>
            Norsk
           </div>
           <div className='Heimkunskap'>
            Heimkunskap
           </div>

          </div>
          
          
      </div>
    </div>
  );
}

export default App;
