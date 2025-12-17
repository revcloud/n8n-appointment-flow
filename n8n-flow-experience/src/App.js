import './App.css';
import ThankYouPageWithAvailability from './experiences/ThankYouPageWithAvailability';
import ThankYouPageWithAgents from "./experiences/ThankYouPageWithAgents"
import { getAgentByZipCode, extractZipFromAddress } from './utils/agentManager';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let experienceId = urlParams.get('plid') || 2;

  const checkZipCodeAndRedirect = () => {
    let zipCode = null;
    const address = urlParams.get('quiz_address');
    if (address) {
      zipCode = extractZipFromAddress(address);
    }
    
    if (!zipCode) {
      return 1;
    }
    
    const isValidZipFormat = /^\d{5}$/.test(zipCode);
    
    if (!isValidZipFormat) {
      return 2;
    }
    
    const agentData = getAgentByZipCode(zipCode);
    
    if (agentData === null) {
      return 1;
    }
    
    return 2;
  };

  experienceId = checkZipCodeAndRedirect();
  
  switch (experienceId) {
    case 2:
    case '2':
      return (
        <div className="App">
          <ThankYouPageWithAgents />
        </div>
      );
    case 1:
    case '1':
      return (
        <div className="App">
          <ThankYouPageWithAvailability />
        </div>
      );
    
  }
}

export default App;
