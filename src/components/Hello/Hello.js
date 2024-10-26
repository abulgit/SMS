import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HelloComponent() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://bknd-api.glitch.me/hello');
        setUserData(response.data);
        setUserData(prevData => ({
          ...prevData,
          screenResolution: `${window.screen.width}x${window.screen.height}`
        }));
      } catch (err) {
        setError('Failed to fetch user data');
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hello!</h1>
      <p>Your IP Address: {userData.ipAddress}</p>
      <p>Your Browser: {userData.browserName} {userData.browserVersion}</p>
      <p>Your CPU Architecture: {userData.cpuArchitecture}</p>
      <p>Your Device: {userData.device}</p>
      <p>Your Language: {userData.language}</p>
      <p>Your Screen Resolution: {userData.screenResolution}</p>
      <p>Your Connection Type: {userData.connectionType}</p>
      <p>Your Current Location: {userData.geolocation}</p>
    </div>
  );
}

export default HelloComponent;
