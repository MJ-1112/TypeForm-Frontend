import React from "react";

function Preview(props) {
  const { formTitle, questions } = props;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        {formTitle || "Form Preview"}
      </h1>

      {questions && questions.length > 0 ? (
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-medium mb-3">
                {index + 1}. {question.text || "Question"}
              </h2>

              {question.type === "radio" && question.options && (
                <div className="space-y-2 ml-4">
                  {question.options.map((option, optIdx) => (
                    <div key={optIdx} className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        id={`option-${question.id}-${optIdx}`}
                        className="mr-2"
                      />
                      <label htmlFor={`option-${question.id}-${optIdx}`}>
                        {option.text || `Option ${optIdx + 1}`}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {question.type === "date" && (
                <div className="ml-4">
                  <input type="date" className="bg-gray-200 p-2 rounded" />
                </div>
              )}

              {question.type === "text" && (
                <div className="ml-4">
                  <input
                    type="text"
                    className="bg-gray-200 w-full p-2 rounded"
                    placeholder="Text answer here"
                  />
                </div>
              )}

              {question.type === "file" && (
                <div className="ml-4">
                  <input type="file" className="bg-gray-200 p-2 rounded" />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No questions added yet.</p>
      )}
    </div>
  );
}

export default Preview;
