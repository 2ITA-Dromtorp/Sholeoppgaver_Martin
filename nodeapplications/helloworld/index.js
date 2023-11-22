import React, { useState } from 'react';
import CourseList from './CourseList';
import RegistrationForm from './RegistrationForm';


function App() {

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

  const [selectedCourse, setSelectedCourse] = useState(null);


  return (
    <div >
      <h1>Voksenopplæring på Drømtorp VGS</h1>
      <CourseList courses={coursesData} onCourseSelect={handleCourseSelection} />
      {selectedCourse && <RegistrationForm course={selectedCourse} />}
    </div>
  );
}

export default App;
