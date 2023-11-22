// CourseList.js

import React from 'react';

const CourseList = ({ courses, onCourseSelect }) => {
  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id} onClick={() => onCourseSelect(course)}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default CourseList;
