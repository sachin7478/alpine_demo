import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function Quiz(props) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const id = parseInt(useParams().id);

  useEffect(() => {
    updateQuestionBank(true);
    
  }, []);

  const updateQuestionBank = (firstLoad = false) => {
    setQuestions((prev)=>{
      if(firstLoad) {
        return props.questionData.find((item)=> item.id = id)?.questionbank;
      }
    })
  }
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const checkAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = parseInt(selectedOption) === currentQuestion.Answer;
    setIsAnswerCorrect(isCorrect);
    setIsAnswered(true);
    if (isCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption('');
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const finishQuiz = () => {
    setIsQuizCompleted(true);
    // navigate('/')
  };

  return (
    <div>
      
      <div className='px-5 py-8 d-flex justify-content-between flex-row'>
        <h1 className="text-center text-warning mt-4">Quiz Page</h1>
        <Link className="btn btn-outline-success align-self-end" to='/'> Home</Link>  
      </div>

        <div className="mt-4 d-flex justify-content-center align-items-center flex-row">
          {/* <h3 className="px-4" data-testid="score">Quiz Score</h3> */}
          <p className="px-4 h3 text-success">Correct Answers: {correctAnswersCount}</p>
          <p className="px-4 h3 text-danger">Incorrect Answers: {currentQuestionIndex - correctAnswersCount}</p>
        </div>

      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <div className="d-flex justify-content-center flex-column px-5 py-3">
          <p data-testid="question">{questions[currentQuestionIndex].Question}</p>
          <div className="p-2">
            <input
              type="radio"
              id="option1"
              name="options"
              value="1"
              checked={selectedOption === '1'}
              onChange={handleOptionChange}
              data-testid="option-1"
            />
            <label className="px-2" htmlFor="option1">{questions[currentQuestionIndex].Option1}</label>
          </div>
          <div className="p-2">
            {/* Repeat the above code block for options 2, 3, and 4 */}
            <input
              type="radio"
              id="option2"
              name="options"
              value="2"
              checked={selectedOption === '2'}
              onChange={handleOptionChange}
              data-testid="option-2"
            />
            <label className="px-2" htmlFor="option2">{questions[currentQuestionIndex].Option2}</label>
          </div>
          <div className="p-2">
            <input
              type="radio"
              id="option3"
              name="options"
              value="3"
              checked={selectedOption === '3'}
              onChange={handleOptionChange}
              data-testid="option-3"
            />
            <label className="px-2" htmlFor="option3">{questions[currentQuestionIndex].Option3}</label>
          </div>
          <div className="p-2">
            <input
              type="radio"
              id="option4"
              name="options"
              value="4"
              checked={selectedOption === '4'}
              onChange={handleOptionChange}
              data-testid="option-4"
            />
            <label className="px-2" htmlFor="option4">{questions[currentQuestionIndex].Option4}</label>
          </div>
          {isAnswered && (
            <div data-testid="validate-answer" 
              class={`alert p-3 ${isAnswerCorrect ? 'alert-success' : 'alert-danger'}`}
            >
              {isAnswerCorrect ? 'Correct Answer!' : 'Wrong Answer!'}
            </div>
          )}
          {!isAnswered && (
            <div>
              <button className="btn btn-primary mt-4" onClick={checkAnswer} data-testid="ok">
                OK
              </button>
            </div>
          )}
          {isAnswered && currentQuestionIndex < questions.length - 1 && (
            <div>
              <button className="btn btn-primary mt-4" onClick={handleNextQuestion} data-testid="next">
                Next
              </button>
            </div>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            
            <button className="btn btn-success my-4 w-25 align-self-center" onClick={finishQuiz} data-testid="finish">
              Finish Quiz
            </button>
          )}
          {isQuizCompleted && (
            <div className="blockquote text-center d-flex card card-header">
              <h3>Quiz Completed!</h3>
              <p>Final Score: {correctAnswersCount} / {questions.length}</p>
            </div>
          )}
          
        </div>
      )}
      
    </div>
  );
}
