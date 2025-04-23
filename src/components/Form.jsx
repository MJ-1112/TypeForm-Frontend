import React, { useState } from 'react';
import Question from './Question';
import Preview from './Preview';
import { createForm } from '../services/api';

function Form(props) {
  const [questionName, setQuestionName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [formLink, setFormLink] = useState("");
  const [error, setError] = useState("");

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: "",
      type: "text",
      options: []
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

  const handleSubmit = async () => {
    if (!questionName.trim()) {
      setError("Please enter a form title");
      return;
    }
    if (questions.length === 0) {
      setError("Please add at least one question");
      return;
    }

    try {
      const formData = {
        title: questionName,
        questions: questions.map(q => ({
          questionText: q.text,
          questionType: q.type,
          options: q.type === 'multiple-choice' ? q.options : []
        }))
      };

      console.log('Submitting form data:', formData);
      const response = await createForm(formData);
      console.log('Form created successfully:', response);
      setFormLink(`${window.location.origin}/form/${response._id}`);
      setShowPreview(true);
      setError("");
    } catch (error) {
      console.error('Error creating form:', error);
      setError("Failed to create form. Please try again.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formLink);
    alert('Link copied to clipboard!');
  };

  return (
    <div>
      {!showPreview ? (
        <div className='bg-gray-100 w-full h-auto rounded-2xl relative top-5 m-5 left-[-20px] p-3 shadow-lg'>
          {error && <div className="text-red-500 mb-4">{error}</div>}

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
            <div className="flex gap-4">
              <button
                className="bg-purple-400 hover:bg-purple-500 text-white font-bold px-6 py-2 rounded-lg transition-colors"
                onClick={handleSubmit}
              >
                Create Form
              </button>
              <button
                className="bg-blue-400 hover:bg-blue-500 text-white font-bold px-6 py-2 rounded-lg transition-colors"
                onClick={() => setShowPreview(true)}
              >
                Preview
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Preview formTitle={questionName} questions={questions} />
          {formLink && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Form Created Successfully!</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formLink}
                  readOnly
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Copy Link
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-center mt-4">
            <button
              className="bg-purple-400 hover:bg-purple-500 text-white font-bold px-6 py-2 rounded-lg transition-colors"
              onClick={() => setShowPreview(false)}
            >
              Back to Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;