import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './QuestionList.css';
import AskQuestionForm from './AskQuestionForm';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const[isAskQuestion,setIsAskquestion] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get('/questions/get');
        setQuestions(res.data);
        console.log(res)
      } catch (err) {
        console.error('Error fetching questions', err);
      }
    };
    fetchQuestions();
  }, []);
  

  return (
   <>
   {
    !isAskQuestion &&
     <div className="question-list">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} className='question-item '>
        <h2>All Questions</h2>
        <button onClick={()=>{
            setIsAskquestion(true)
        }} >Ask a question</button>
      </div>
      {questions.map((q) => (
        <div key={q.id} className="question-item">
          <h3>{q.title}</h3>
          <Link to={`/questions/${q.id}`}>View</Link>
        </div>
      ))}
      
     
    </div>
   }

    {
        isAskQuestion && <AskQuestionForm setIsAskquestion={setIsAskquestion}/>
      }
   </>
  );
};

export default QuestionList;
