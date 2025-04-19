import React, { useState } from "react";
import Option from './Options';

function Question({ questionId }) {
  const [type, setType] = useState('radio');
  const [showOptions, setShowOptions] = useState(true);

  function handleType(event) {
    const selectedType = event.target.value;
    setType(selectedType);
    
   
    if (selectedType === "radio") {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }

  return (
    <div>
      <div className="bg-gray-100 w-full h-auto rounded-2xl relative m-5 p-3 shadow-lg">
        <input
          type="text"
          className="w-1/2 h-10 rounded-xl border bg-gray-300 p-2 absolute left-0 ml-3"
          placeholder="Write the Question"
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
              <Option type="radio" placeholder="Radio option" />
              <button className="bg-purple-300 px-4 py-2 rounded-lg mt-2">Add Option</button>
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