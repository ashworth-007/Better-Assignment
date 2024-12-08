import React, { useState } from 'react';
import SignUpForm from './components/SignUp';
import SignInForm from './components/SignIn';
import './App.css';
import './index.css';

function App() {
  const [formType, setFormType] = useState('signUp'); // Default form is SignUp
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSuccess = () => {
    setAlertVisible(true);
    setErrorMessage('');
  };

  const handleLoginFailure = () => {
    setErrorMessage('Invalid credentials. Please try again.');
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-8">
      {/* Alert Modal */}
      {isAlertVisible && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-bold text-green-600">Login Successful!</h2>
            <button
              onClick={closeAlert}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}

      {/* Buttons to switch between Sign Up and Sign In forms */}
      <div className="space-x-4">
        <button
          onClick={() => setFormType('signUp')}
          className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
        <button
          onClick={() => setFormType('signIn')}
          className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>

      {/* Conditionally render the form based on the selected formType */}
      {formType === 'signUp' ? <SignUpForm /> : <SignInForm onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}
    </div>
  );
}

export default App;
