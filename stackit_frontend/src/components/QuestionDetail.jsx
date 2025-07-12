import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import RichTextEditor from './RichTextEditor';
import './QuestionDetail.css'; // Optional: externalize styles

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qRes = await api.get(`/questions/${id}`);
        const aRes = await api.get(`/questions/${id}/answers`);
        setQuestion(qRes.data);
        setAnswers(aRes.data);
      } catch (err) {
        console.error('Error fetching question', err);
      }
    };
    fetchData();
  }, [id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/questions/${id}/answers/`, {
        content: answerText,
      });
      setAnswerText('');
      setMessage('✅ Answer posted!');
      const aRes = await api.get(`/questions/${id}/answers`);
      setAnswers(aRes.data);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to post answer.');
    }
  };

  if (!question) return <p style={{ color: 'white' }}>Loading...</p>;

    return (
    <div className="question-detail-container">
        <h2>{question.title}</h2>
        <div className="description-box" dangerouslySetInnerHTML={{ __html: question.description }} />

        <div className="tags">
        {question.tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
        ))}
        </div>

        <h3>Answers ({answers.length})</h3>
        {answers.map((ans, idx) => (
        <div key={idx} className="answer">
            <div dangerouslySetInnerHTML={{ __html: ans.content }} />
        </div>
        ))}

        <h3>Post Your Answer</h3>
        {message && <p className="form-message">{message}</p>}
        <form onSubmit={handleAnswerSubmit}>
        <RichTextEditor value={answerText} onChange={setAnswerText} />
        <button type="submit" className="submit-btn">Submit Answer</button>
        </form>
    </div>
    );

};

export default QuestionDetail;
