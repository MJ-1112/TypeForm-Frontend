import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFormById, submitResponse } from '../services/api';

const FormResponse = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await getFormById(formId);
        setForm(data);
        // Initialize answers object
        const initialAnswers = {};
        data.questions.forEach((_, index) => {
          initialAnswers[index] = '';
        });
        setAnswers(initialAnswers);
      } catch (error) {
        setError('Form not found');
      }
    };
    fetchForm();
  }, [formId]);

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = {
        answers: form.questions.map((_, index) => ({
          questionId: index.toString(),
          answer: answers[index]
        }))
      };
      
      await submitResponse(formId, responseData);
      setSuccess(true);
      setAnswers({});
    } catch (error) {
      setError('Failed to submit response. Please try again.');
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!form) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (success) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl text-green-500 mb-4">Response Submitted Successfully!</h2>
        <p>Thank you for your response.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">{form.title}</h1>
        <form onSubmit={handleSubmit}>
          {form.questions.map((question, index) => (
            <div key={index} className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {question.questionText}
              </label>
              {question.questionType === 'text' && (
                <input
                  type="text"
                  value={answers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              )}
              {question.questionType === 'multiple-choice' && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <input
                        type="radio"
                        id={`question-${index}-option-${optionIndex}`}
                        name={`question-${index}`}
                        value={option.text}
                        checked={answers[index] === option.text}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        className="mr-2"
                        required
                      />
                      <label htmlFor={`question-${index}-option-${optionIndex}`}>
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {question.questionType === 'checkbox' && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={answers[index] === 'true'}
                    onChange={(e) => handleAnswerChange(index, e.target.checked.toString())}
                    className="mr-2"
                  />
                  <label>Yes</label>
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Submit Response
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormResponse; 