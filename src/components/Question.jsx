import React, { useState, useEffect } from "react";
import Option from './Options';

function Question({ questionId, onUpdate }) {
  const [type, setType] = useState('radio');
  const [showOptions, setShowOptions] = useState(true);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "" }]);

  useEffect(() => {
    // Notify parent component when question data changes
    onUpdate && onUpdate({
      text: question,
      type: type,
      options: type === "radio" ? options : []
    });
  }, [question, type, options, onUpdate]);

  function handleQuestion(event) {
    setQuestion(event.target.value);
  }

  function handleType(event) {
    const selectedType = event.target.value;
    setType(selectedType);
    
    if (selectedType === "radio") {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }

  function addOption() {
    setOptions([...options, { text: "" }]);
  }

  function updateOption(index, value) {
    const updatedOptions = [...options];
    updatedOptions[index] = { text: value };
    setOptions(updatedOptions);
  }

  return (
    <div>
      <div className="bg-gray-100 w-full h-auto rounded-2xl relative m-5 p-3 shadow-lg">
        <input
          type="text"
          className="w-1/2 h-10 rounded-xl border bg-gray-300 p-2 absolute left-0 ml-3"
          placeholder="Write the Question"
          value={question}
          onChange={handleQuestion}
        />
        <select
          name="Qtype"
          value={type}
          className="bg-gray-300 w-60 absolute right-5 rounded-lg h-10"
          onChange={handleType}
        >
          <option value="radio">Single Correct</option>
          <option value="date">Date</option>
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>

        <div className="mt-16 pt-4">
          {type === "radio" && (
            <div className="radio-options">
              {options.map((option, index) => (
                <div key={index} className="mb-2">
                  <input 
                    type="radio" 
                    name={`question-${questionId}`} 
                    disabled 
                    className="mr-2" 
                  />
                  <input
                    type="text"
                    className="bg-gray-200 w-4/5 h-10 rounded-xl p-2"
                    placeholder={`Option ${index + 1}`}
                    value={option.text}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                </div>
              ))}
              <button 
                className="bg-purple-300 px-4 py-2 rounded-lg mt-2"
                onClick={addOption}
              >
                Add Option
              </button>
            </div>
          )}
          
          {type === "date" && (
            <div className="date-input">
              <Option type="date" />
            </div>
          )}
          
          {type === "text" && (
            <div className="text-input">
              <Option type="text" placeholder="Text answer here" />
            </div>
          )}
          
          {type === "file" && (
            <div className="file-input">
              <Option type="file" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Question;