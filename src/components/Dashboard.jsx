import React, { useState, useEffect } from 'react';
import { getForms } from '../services/api';

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await getForms();
        setForms(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching forms:', error);
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Form Responses Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Forms List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
          <div className="space-y-4">
            {forms.map(form => (
              <div
                key={form._id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedForm?._id === form._id
                    ? 'bg-purple-100 border-2 border-purple-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedForm(form)}
              >
                <h3 className="font-medium">{form.title}</h3>
                <p className="text-sm text-gray-500">
                  {form.responses?.length || 0} responses
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Responses View */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedForm ? `${selectedForm.title} - Responses` : 'Select a Form'}
          </h2>
          
          {selectedForm ? (
            <div className="space-y-6">
              {selectedForm.responses?.map((response, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Response {index + 1}</h3>
                  <div className="space-y-2">
                    {response.answers.map((answer, i) => (
                      <div key={i} className="text-sm">
                        <span className="font-medium">
                          {selectedForm.questions[i].questionText}:
                        </span>{' '}
                        {answer.answer}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {(!selectedForm.responses || selectedForm.responses.length === 0) && (
                <p className="text-gray-500">No responses yet</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Select a form to view its responses</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 