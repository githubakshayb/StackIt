import React, { useState } from 'react';
import api from '../api';
import Select from 'react-select';
import RichTextEditor from './RichTextEditor';
import './AskQuestionForm.css';

const AskQuestionForm = ({setIsAskquestion}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/questions/', {
        title,
        description,
        tags: tags.map((tag) => tag.value),
      });
      setMessage('✅ Question posted!');
      setTitle('');
      setDescription('');
      setTags([]);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to post question.');
    }
  };

  const tagOptions = [
    { value: 'React', label: 'React' },
    { value: 'SQL', label: 'SQL' },
    { value: 'JWT', label: 'JWT' },
    { value: 'JOIN', label: 'JOIN' },
  ];

  const getTagColor = (value) => {
    switch (value) {
      case 'React': return '#61dafb';
      case 'SQL': return '#f0ad4e';
      case 'JWT': return '#6f42c1';
      case 'JOIN': return '#28a745';
      default: return '#007bff';
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: '44px',
      fontSize: '16px',
    }),
    option: (base, state) => ({
      ...base,
      color: '#000',
      backgroundColor: state.isFocused ? '#e0e0e0' : 'white',
    }),
    multiValue: (base, { data }) => ({
      ...base,
      backgroundColor: getTagColor(data.value),
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#000',
      fontWeight: 'bold',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#000',
      ':hover': {
        backgroundColor: '#ff4d4f',
        color: '#fff',
      },
    }),
  };

  return (
    <div className="ask-form-wrapper">
      <div className="ask-form">
         <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} className='question-item '>
        <h2>All Questions</h2>
        <button onClick={()=>{
            setIsAskquestion(false)
        }} >X</button>
      </div>
        {message && <p className="form-message">{message}</p>}

        <form onSubmit={handleSubmit}>
        <input
            className="form-input"
            type="text"
            placeholder="Enter question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />

        <div className="editor-container">
            <RichTextEditor value={description} onChange={setDescription} />
        </div>

        <div className="select-container">
        <Select
            isMulti
            options={tagOptions}
            value={tags}
            onChange={setTags}
            placeholder="Select tags"
            styles={customStyles}
        />
        </div>

        <div className="submit-wrapper">
        <button type="submit" className="submit-btn">Submit</button>
        </div>
        </form>

      </div>
    </div>
  );
};

export default AskQuestionForm;
