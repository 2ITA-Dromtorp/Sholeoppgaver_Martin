// Quiz.js
import React, { useState, useEffect } from 'react';
import Congratulations from './Congratulations.js';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(-1); // Start at -1 to show the start screen
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [cheatMode, setCheatMode] = useState(false);
  const [password, setPassword] = useState('');
  const [timer, setTimer] = useState(15);
  const [timeUp, setTimeUp] = useState(false);
  const correctPassword = 'Martin';

  const questions = [
    {
      question: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'Highly Typed Modern Language', 'Hyperlink and Text Markup Language', 'Home Tool Markup Language'],
      correctAnswer: 'Hyper Text Markup Language',
    },
    {
      question: 'Which programming language is often used for building web applications?',
      options: ['Java', 'Python', 'JavaScript', 'C#'],
      correctAnswer: 'JavaScript',
    },
    {
      question: 'What is the purpose of CSS?',
      options: ['To structure web pages', 'To style web pages', 'To provide interactivity', 'To handle server-side logic'],
      correctAnswer: 'To style web pages',
    },
  ];

  const handleAnswerClick = (selectedAnswer) => {
    if (!cheatMode && currentQuestion !== -1) {
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimer(15);
    } else {
      setQuizCompleted(true);
    }
  };

  const revealAnswer = () => {
    setCheatMode(true);
  };

  const disableCheatMode = () => {
    setCheatMode(false);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setCheatMode(true);
    } else {
      alert('Incorrect password. Cheat mode not activated.');
    }
  };

  const handleStartQuiz = () => {
    setCurrentQuestion(0);
  };

  useEffect(() => {
    let timerId;

    if (timer > 0 && !quizCompleted && !cheatMode && currentQuestion !== -1) {
      timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !quizCompleted) {
      setTimeUp(true);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timer, quizCompleted, cheatMode, currentQuestion]);

  return (
    <div className={`quiz-container${timeUp ? ' time-up' : ''}`}>
      <h1>IT Quiz</h1>

      {currentQuestion === -1 && !quizCompleted && (
        <button onClick={handleStartQuiz}>Start Quiz</button>
      )}

      {!quizCompleted && currentQuestion !== -1 && !cheatMode && !timeUp ? (
        <div>
          <div className="timer-container">Time: {timer}s</div>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {cheatMode ? (
            <button onClick={disableCheatMode}>Disable Cheat Mode</button>
          ) : (
            <button onClick={revealAnswer} disabled={quizCompleted}>
              Cheat Mode
            </button>
          )}
        </div>
      )}

      {!quizCompleted && currentQuestion !== -1 && (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          {currentQuestion !== -1 && (
            <div className="timer-container">Time: {timer}s</div>
          )}
          {cheatMode && (
            <p>The correct answer is: {questions[currentQuestion].correctAnswer}</p>
          )}
        </div>
      )}

      {quizCompleted && (
        <Congratulations score={score} totalQuestions={questions.length} />
      )}

      {timeUp && currentQuestion !== -1 && (
        <div className="failure-screen">
          <h2>YOU HAVE FAILED</h2>
        </div>
      )}
    </div>
  );
};

export default Quiz;
