import React, { useState } from 'react';
import Options from './Options';

function Question({ questionId, onUpdate }) {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('text');
  const [options, setOptions] = useState([{ text: '' }]);

  const handleQuestionTextChange = (e) => {
    const newText = e.target.value;
    setQuestionText(newText);
    onUpdate({ text: newText, type: questionType, options });
  };

  const handleQuestionTypeChange = (e) => {
    const newType = e.target.value;
    setQuestionType(newType);
    if (newType === 'multiple-choice') {
      setOptions([{ text: '' }]);
    }
    onUpdate({ text: questionText, type: newType, options });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = { text: value };
    setOptions(newOptions);
    onUpdate({ text: questionText, type: questionType, options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...options, { text: '' }];
    setOptions(newOptions);
    onUpdate({ text: questionText, type: questionType, options: newOptions });
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    onUpdate({ text: questionText, type: questionType, options: newOptions });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={questionText}
        onChange={handleQuestionTextChange}
        placeholder="Enter your question"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      
      <select
        value={questionType}
        onChange={handleQuestionTypeChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="text">Text</option>
        <option value="multiple-choice">Single Correct</option>
        <option value="checkbox">Checkbox</option>
      </select>

      {questionType === 'multiple-choice' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Options:</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {options.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="text-purple-500 hover:text-purple-700"
          >
            Add Option
          </button>
        </div>
      )}
    </div>
  );
}

export default Question;