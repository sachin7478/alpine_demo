import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom'



export default function Home(props) {
  const [questionnaires, setQuestionnaires] = useState([props.questionData]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const navigate = useNavigate();
  const updateSelectedBlock = (blockId) => {
    setSelectedBlock( (prev) => blockId );
    navigate(`questionnaire/${blockId}`, { replace: true, data:questionnaires, block:selectedBlock })
  }
  return (
    <>
    <h1 className="items-center d-flex my-5 justify-content-center text-success">Questionair Home</h1>

    <div className='d-flex p-2 flex-row justify-content-center'>
      {questionnaires[0].map((questionBlock, index) => (
          <QuestionBockcard key={index} questionBlock={questionBlock} updateSelectedBlock={updateSelectedBlock}/>
      ))}
    </div>
    
    </>
  );
}

const QuestionBockcard = (props) => {
  const {id, questionbank } = props.questionBlock;
  const {updateSelectedBlock} = props
  
  console.log(id,questionbank)
  const attemptQuiz = (e) => {
    e.preventDefault();
   updateSelectedBlock(parseInt(e.target.id));
  };
  return(<>
    <div className="card mx-3" >
      <div className="card-body">
        <h5 className="card-title">Qustion Block {id}</h5>
        <h6 className="card-subtitle mb-2 text-muted pb-3">Total {questionbank.length} questions</h6>
        <p className="card-text">10 second per qustion is allowed.</p>
        <p className="card-text">10 If Qustion is un-answered, it will be cosidered as wrong answer.</p>
        <p className="card-text">No Negative marking system.</p>
        <button className="btn btn-primary mt-3" id={id} onClick={attemptQuiz}>Attempt</button>
      </div>
    </div>
  </>)
}

