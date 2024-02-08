// ProgressBar.js
import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-text">{`${currentQuestion + 1}/${totalQuestions}`}</div>
    </div>
  );
};

export default ProgressBar;
