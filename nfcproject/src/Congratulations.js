// Congratulations.js
import React from 'react';
import './Congratulations.css';

const Congratulations = ({ score, totalQuestions }) => {
  const isPerfectScore = score === totalQuestions;

  const inspiringQuotes = [
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. - Albert Schweitzer",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    // Add more inspiring quotes as needed
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * inspiringQuotes.length);
    return inspiringQuotes[randomIndex];
  };

  return (
    <div className="congratulations-container">
      <h2>Congratulations!</h2>
      <p>Your IT Quiz is completed.</p>
      <p>Your score is: {score} out of {totalQuestions}</p>

      {isPerfectScore ? (
        <p>
          {getRandomQuote()}
        </p>
      ) : (
        <p>
          "Don't worry about failures, worry about the chances you miss when you don't even try." - Jack Canfield
        </p>
      )}
    </div>
  );
};

export default Congratulations;
