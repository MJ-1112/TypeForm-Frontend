import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Form from './components/Form';
import FormResponse from './components/FormResponse';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [projectName, setProjectName] = useState("");

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-300 to-blue-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                  TypeForm
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  Create Form
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 pt-8">
          <Routes>
            <Route
              path="/"
              element={
                <div>
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
                    <Form value={projectName} />
                  </div>
                </div>
              }
            />
            <Route path="/form/:formId" element={<FormResponse />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;