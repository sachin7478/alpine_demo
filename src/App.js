import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import questionBank from './api/questionBank.json';

export const LocationDisplay = () => {
  const location = useLocation();
  return (
    <div data-testid="location-display" style={{ display: 'none' }}>
      {location.pathname}
    </div>
  );
};

function App() {
  const [questionData, setQuestionData] = useState(questionBank)
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home questionData={questionData} />} />
        <Route exact path="/questionnaire/:id" element={<Quiz questionData={questionData} />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;