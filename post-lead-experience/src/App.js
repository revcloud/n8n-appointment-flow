import React from 'react';
import './App.css';
import ThankYouPage from './experiences/ThankYouPage';
import ThankYouPageWithAvailabiltyAndType from './experiences/ThankYouPageWithAvailabiltyAndType';
import ThankYouPageWithAvailability from './experiences/ThankYouPageWithAvailability';
import ThankYouPageCallMeNow from './experiences/ThankYouPageCallMeNow';
import ThankYouPageWithAgents from './experiences/ThankYouPageWithAgents';
import ThankYouPageWithBbys from './experiences/ThankYouPageWithBbys';
import { getAgentByZipCode, extractZipFromAddress } from './utils/agentManager';

function App() {
  // Get experience ID from URL parameters or default to 5
  const urlParams = new URLSearchParams(window.location.search);
  let experienceId = urlParams.get('plid') || 5;

  // Check ZIP code to determine if user should be redirected to ThankYouPageWithAvailability
  const checkZipCodeAndRedirect = () => {
    // Try to get ZIP from quiz_zip parameter
    let zipCode = urlParams.get('quiz_zip');
    
    // If no ZIP from quiz_zip, try to extract from quiz_address
    if (!zipCode) {
      const address = urlParams.get('quiz_address');
      if (address) {
        zipCode = extractZipFromAddress(address);
      }
    }
    
    // If no ZIP code found, redirect to ThankYouPageWithAvailability (case 2)
    if (!zipCode) {
      return 2;
    }
    
    // Validate ZIP code format (must be exactly 5 digits)
    const isValidZipFormat = /^\d{5}$/.test(zipCode);
    
    // If ZIP code is invalid (not 5 digits), redirect to ThankYouPageWithAvailability (case 2)
    if (!isValidZipFormat) {
      return 2;
    }
    
    // If we have a valid ZIP code format, check if it exists in any agent's ZIP code list
    const agentData = getAgentByZipCode(zipCode);
    
    // If agentData is null, ZIP code is not in any agent's coverage area
    // Redirect to ThankYouPageWithAvailability (case 2)
    if (agentData === null) {
      return 2;
    }
    
    // If ZIP code matches a specific agent (Robert H., Greenwood Village, Fresno), use ThankYouPageWithAgents (case 5)
    return 5;
  };

  // Override experienceId based on ZIP code logic
  experienceId = checkZipCodeAndRedirect();
  
  // Render component based on experienceId using switch case
  switch (experienceId) {
    case 6:
    case '6':
      return (
        <div className="App">
          <ThankYouPageWithBbys />
        </div>
      );
    case 5:
    case '5':
      return (
        <div className="App">
          <ThankYouPageWithAgents />
        </div>
      );
    case 4:
    case '4':
      return (
        <div className="App">
          <ThankYouPageCallMeNow />
        </div>
    );
    case 3:
    case '3':
      return (
        <div className="App">
          <ThankYouPageWithAvailabiltyAndType />
        </div>
      );

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
