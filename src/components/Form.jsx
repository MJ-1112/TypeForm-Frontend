import React, { useState } from 'react';
import Question from './Question'; 
import Preview from './Preview';

function Form(props) {
  const [questionName, setQuestionName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddQuestion = () => {
    const newQuestion = { 
      id: Date.now(),
      text: "",
      type: "radio",
      options: [{ text: "" }]
    };
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };
  
  const updateQuestion = (id, updatedData) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(question => 
        question.id === id ? { ...question, ...updatedData } : question
      )
    );
  };

  const createForm = () => {
    setShowPreview(true);
  };
  
  return (
    <div>
      {!showPreview ? (
        <div className='bg-gray-100 w-full h-auto rounded-2xl relative top-5 m-5 left-[-20px] p-3 shadow-lg'>
          <label className='text-black text-2xl mr-5'>{props.value}</label>
          <input 
            type="text" 
            value={questionName}
            onChange={(e) => setQuestionName(e.target.value)}
            className='w-full h-10 rounded-xl border-0.5 bg-gray-300 p-2' 
            placeholder='Give Title of your Form' 
          />
          <button 
            className='bg-purple-300 w-60 h-10 rounded-2xl m-5'
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
          
          <div className="max-w-4xl mx-auto">
            {questions.map(question => (
              <div key={question.id} className="mb-4 bg-white p-3 rounded-lg">
                <p className="font-medium mb-2">Question {questions.indexOf(question) + 1}</p>
                <Question 
                  questionId={question.id} 
                  onUpdate={(data) => updateQuestion(question.id, data)} 
                />
              </div>
            ))}
          </div>
          
          {questions.length > 0 && (
            <button 
              className="bg-purple-400 hover:bg-purple-500 text-white font-bold px-6 py-2 rounded-lg transition-colors"
              onClick={createForm}
            >
              Create
            </button>
          )}
        </div>
      ) : (
        <div>
          <Preview formTitle={questionName} questions={questions} />
        </div>
      )}
    </div>
  );
}

export default Form;