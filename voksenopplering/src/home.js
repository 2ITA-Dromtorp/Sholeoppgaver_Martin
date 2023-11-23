// App.js

import React, { useState } from 'react';
import CourseList from './CourseList';
import RegistrationForm from './RegistrationForm';
import './App.css';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  let navigate = useNavigate()

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
          <div className='Norsk' onClick={() => navigate('/info/Grunnleggende datakunnskap')}>
          Grunnleggende datakunnskap
           </div>
          <div className='Heimkunskap'onClick={() => navigate('/info/Kroppsøving')}>
          Kroppsøving
           </div>
          </div>
          <div className='RightMid'>

           <div className='Norsk'onClick={() => navigate('/info/norsk')}>
            Norsk
           </div> 
           <div className='Heimkunskap'onClick={() => navigate('/info/Heimkunskap')}>
            Heimkunskap
           </div>
           

          </div>
          
          
      </div>
    </div>
  );
}

export default Home;
