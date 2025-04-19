import { useState } from 'react';
import Form from './components/Form';
import Question from './components/Question';

import './App.css';

function App() {
  const [projectName, setProjectName] = useState("");
  const [forms, setForms] = useState([]);

  const handleAddForm = () => {
    setForms(prevForms => [...prevForms, { id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-300 to-blue-100">
     
      <div className="container mx-auto px-4 pt-8 relative">
        <h1 className="text-5xl text-center font-bold text-gray-600 mb-8">TypeForm</h1>
        
        
        <div className="bg-gray-100 rounded-2xl shadow-lg p-8 mb-10 max-w-4xl mx-auto">
          <div className="bg-gray-300 rounded-lg p-2 mb-6">
            <input 
              type="text" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Write the Project Name" 
              className="w-full px-3 py-2 rounded-md"
              required
            />
          </div>
          
          <button 
            className="bg-purple-400 hover:bg-purple-500 text-white font-bold px-6 py-2 rounded-lg transition-colors"
            onClick={handleAddForm}
          >
            Add Form
          </button>
        </div>
        
       
        <div className="max-w-4xl mx-auto">
          {forms.map(form => (
            <div key={form.id} >
              <Form />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;