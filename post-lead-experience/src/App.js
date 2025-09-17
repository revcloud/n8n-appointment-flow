import React from 'react';
import './App.css';
import ThankYouPage from './experiences/ThankYouPage';
import ThankYouPageWithAvailability from './experiences/ThankYouPageWithAvailability';

function App() {
  // Get experience ID from URL parameters or default to 1
  const urlParams = new URLSearchParams(window.location.search);
  const experienceId = urlParams.get('plid') || 1;
  
  // Render component based on experienceId using switch case
  switch (experienceId) {
    case 2:
    case '2':
      return (
        <div className="App">
          <ThankYouPageWithAvailability />
        </div>
      );
    
    case 1:
    case '1':
    default:
      return (
        <div className="App">
          <ThankYouPage />
        </div>
      );
  }
}

export default App;
