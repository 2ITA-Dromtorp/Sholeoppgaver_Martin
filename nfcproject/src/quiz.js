// Quiz.js
import React, { useState, useEffect } from 'react';
import Congratulations from './Congratulations';
import ProgressBar from './ProgressBar'; // Import the ProgressBar component
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [cheatMode, setCheatMode] = useState(false);
  const [password, setPassword] = useState('');
  const [timer, setTimer] = useState(15);
  const [timeUp, setTimeUp] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]); // Track incorrect answers
  const correctPassword = 'Martin';

  useEffect(() => {
    // Fetch questions from JSON file
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => {
        console.log("Yoho") // Ensure questions are fetched correctly
        console.log(data);
        setQuestions(data);
      })
      .catch(error => console.error('FEIL:', error));
  }, []);

  setTimeout(() => window.close(), 30 * 1000);

  const handleAnswerClick = (selectedAnswer) => {
    if (!cheatMode) {
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      } else {
        // Store incorrect answer and its correct counterpart
        setIncorrectAnswers(prevAnswers => [...prevAnswers, {
          question: questions[currentQuestion].question,
          correctAnswer: questions[currentQuestion].correctAnswer
        }]);
      }
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimer(15);
    } else {
      console.log(" 1")
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

  useEffect(() => {
    if (quizStarted === false) return
    let timerId;

    if (timer > 0 && !quizCompleted && !cheatMode) {
      timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !quizCompleted) {
      setTimeUp(true);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timer, quizCompleted, cheatMode, quizStarted]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestion === questions.length) {
      // Quiz is completed, show congratulations 
      console.log(currentQuestion, questions.length)
      setQuizCompleted(true);
    } else {
      setQuizCompleted(false);
    }
  }, [currentQuestion, questions]);

  return (
    <div className={`quiz-container${timeUp ? ' time-up' : ''}`}>
      <h1 id="">IT Quiz</h1>

      {!quizCompleted && !quizStarted ? (
        <>
          <button onClick={() => {
            setQuizStarted(true);
            for (let i = 0; i < 100; i++) console.log("funker ")
          }}>
            Start quiz
          </button>
        </>
      ) : undefined}

      {quizStarted && !quizCompleted && currentQuestion !== -1 && !cheatMode && !timeUp && questions.length > 0 ? (
        <div>
          <div className="timer-container">Time: {timer}s</div>
          <ProgressBar currentQuestion={currentQuestion} totalQuestions={questions.length} /> {/* Include ProgressBar component */}
          <h2>{questions[currentQuestion].question}</h2>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li className='' key={index} onClick={() => handleAnswerClick(option)}>
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

      {quizCompleted && !timeUp && (
        <Congratulations score={score} totalQuestions={questions.length} incorrectAnswers={incorrectAnswers} /> /* Pass incorrect answers */
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
