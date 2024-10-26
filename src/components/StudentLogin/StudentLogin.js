// src/components/StudentLogin/StudentLogin.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentLogin() {
  const [regNumber, setRegNumber] = useState('');
  const [error, setError] = useState('');
  const [studentData, setStudentData] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bknd-api.glitch.me/student/login', { regNumber });
      setStudentData(response.data); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-md">
        <div className={`shadow-md rounded-lg p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <AnimatePresence>
            {!studentData ? (
              <motion.div
                key="loginForm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Student Login</h2>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Enter Registration number to See Your Profile.</h3><br/>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="regNumber" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Registration Number:
                    </label>
                    <input
                      type="text"
                      className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                      id="regNumber"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
                      GO
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="studentProfile"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={`text-xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Student Profile</h3><br/>
                <div className="flex justify-center mb-4">
                  {studentData.profilePicture ? (
                    <img 
                      src={studentData.profilePicture} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
                    />
                  ) : (
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center border-2 border-blue-500 hover:border-red-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <span className={`text-4xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {studentData.firstName[0]}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className={`text-base font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hello, {studentData.firstName}</h3><br/>
                <div className="space-y-2">
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name: {studentData.name}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Roll Number: {studentData.rollNumber}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Registration Number: {studentData.regNumber}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Department Name: {studentData.deptName}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Passing Year: {studentData.year}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Age: {studentData.age}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gender: {studentData.gender}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address: {studentData.address}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contact Number: {studentData.contactNumber}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
