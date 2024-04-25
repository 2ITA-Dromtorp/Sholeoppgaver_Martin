import React, { useState, useEffect } from 'react';
import Congratulations from './Congratulations';
import ProgressBar from './ProgressBar';
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
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  const correctPassword = 'Martin';

  useEffect(() => {
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  setTimeout(() => window.close(), 30 * 1000);

  const handleAnswerClick = (selectedAnswer) => { 
    if (!cheatMode) {
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      } else {
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
      setQuizCompleted(true);
    }
  };

  const handlePlayAgain = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setCheatMode(false);
    setPassword('');
    setTimer(15);
    setTimeUp(false);
    setQuizStarted(false);
    setIncorrectAnswers([]);
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
      })
      .catch(error => console.error('Error fetching questions:', error));
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
    if (quizStarted === false) return;
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
      setQuizCompleted(true);
    }
  }, [currentQuestion, questions]);

  return (
    <div className={`quiz-container${timeUp ? ' time-up' : ''}`}>
      <h1>IT Quiz</h1>

      {!quizCompleted && !quizStarted ? (
        <button onClick={() => setQuizStarted(true)}>Start quiz</button>
      ) : null}

      {quizStarted && !quizCompleted && currentQuestion !== -1 && !cheatMode && !timeUp && questions.length > 0 ? (
        <div>
          <div className="timer-container">Time: {timer}s</div>
          <ProgressBar currentQuestion={currentQuestion} totalQuestions={questions.length} />
          <h2>{questions[currentQuestion].question}</h2>
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
            <button onClick={revealAnswer} disabled={quizCompleted}>Cheat Mode</button>
          )}
        </div>
      )}

      {quizCompleted && !timeUp && (
        <Congratulations
          score={score}
          totalQuestions={questions.length}
          incorrectAnswers={incorrectAnswers}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {timeUp && currentQuestion !== -1 && (
        <div className="failure-screen">
          <h2>YOU HAVE FAILED</h2>
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
