import React, { useState, useEffect } from 'react';
import IconAlyson from '../assets/alyson_logo.png';
import Home from '../assets/home.png';
import './CallMeNowModal.css';
import { initConnectStreamsSession } from '../api/connectStreams';

const CallMeNowModal = ({ isOpen, onClose }) => {
  const [currentScreen, setCurrentScreen] = useState('call-button'); // 'call-button', 'ringing', 'screen3', 'screen4', 'screen5', 'screen6', 'change-number'
  const [phoneNumber, setPhoneNumber] = useState('(978) 615-2265');

  // Get URL parameters for Connect Streams
  const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      phone: urlParams.get('quiz_phone') || '9786152265', // Remove formatting for API
      userUuid: urlParams.get('cookee_id') || 'default-user-uuid',
      pageUrl: window.location.href,
    };
  };

  // Handle Connect Streams API call
  const handleConnectStreamsCall = async () => {
    try {
      const { phone, userUuid, pageUrl } = getUrlParams();
      
      // Clean phone number (remove formatting)
      const cleanPhone = phone.replace(/\D/g, '');
      
      const response = await initConnectStreamsSession({
        phoneNumber: cleanPhone,
        pageUrl: pageUrl,
        userUuid: userUuid,
      });
      
      console.log('Connect Streams response:', response);
      
      // Move to ringing screen after successful API call
      setCurrentScreen('ringing');
      
      // Check API response for call status - direct transition
      if (response.success && response.callstatus === "completed") {
        // ✅ Call complete
        setCurrentScreen('screen3');
      } else if (response.callstatus === "failed") {
        // ❌ Call failed
        setCurrentScreen('screen4');
      } else {
        // ⏳ Still in progress - simulate outcome
        const callAnswered = Math.random() > 0.3;
        if (callAnswered) {
          setCurrentScreen('screen3'); // Call complete
        } else {
          setCurrentScreen('screen4'); // Missed call
        }
      }
      
    } catch (error) {
      console.error('Connect Streams API error:', error);
      // Still move to ringing screen even if API fails
      setCurrentScreen('ringing');
      
      // Simulate call outcome even on error
      const callAnswered = Math.random() > 0.3;
      if (callAnswered) {
        setCurrentScreen('screen3'); // Call complete
      } else {
        setCurrentScreen('screen4'); // Missed call
      }
    }
  };

  // Handle Connect Streams API call with custom phone number
  const handleConnectStreamsCallWithCustomPhone = async () => {
    try {
      const { userUuid, pageUrl } = getUrlParams();
      
      // Clean phone number from input field (remove formatting)
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      
      const response = await initConnectStreamsSession({
        phoneNumber: cleanPhone,
        pageUrl: pageUrl,
        userUuid: userUuid,
      });
      
      console.log('Connect Streams response (custom phone):', response);
      
      // Move to ringing screen after successful API call
      setCurrentScreen('ringing');
      
      // Check API response for call status - direct transition
      if (response.success && response.callstatus === "completed") {
        // ✅ Call complete
        setCurrentScreen('screen3');
      } else if (response.callstatus === "failed") {
        // ❌ Call failed
        setCurrentScreen('screen4');
      } else {
        // ⏳ Still in progress - simulate outcome
        const callAnswered = Math.random() > 0.3;
        if (callAnswered) {
          setCurrentScreen('screen3'); // Call complete
        } else {
          setCurrentScreen('screen4'); // Missed call
        }
      }
      
    } catch (error) {
      console.error('Connect Streams API error (custom phone):', error);
      // Still move to ringing screen even if API fails
      setCurrentScreen('ringing');
      
      // Simulate call outcome even on error
      const callAnswered = Math.random() > 0.3;
      if (callAnswered) {
        setCurrentScreen('screen3'); // Call complete
      } else {
        setCurrentScreen('screen4'); // Missed call
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset to first screen when modal opens
      setCurrentScreen('call-button');
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle "Call me again" button - repeat the same process
  const handleCallMeAgain = () => {
    handleConnectStreamsCall();
  };

  const handleNextScreen = () => {
    const screens = ['call-button', 'ringing', 'screen3', 'screen4', 'screen5', 'screen6'];
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex < screens.length - 1) {
      setCurrentScreen(screens[currentIndex + 1]);
    }
  };

  const handleChangeNumber = () => {
    setCurrentScreen('change-number');
  };

  const handleBackToMissedCall = () => {
    setCurrentScreen('screen4');
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Limit to 10 digits for US phone numbers
    const limitedPhoneNumber = phoneNumber.slice(0, 10);
    
    // Format as (XXX) XXX-XXXX
    if (limitedPhoneNumber.length >= 6) {
      return `(${limitedPhoneNumber.slice(0, 3)}) ${limitedPhoneNumber.slice(3, 6)}-${limitedPhoneNumber.slice(6)}`;
    } else if (limitedPhoneNumber.length >= 3) {
      return `(${limitedPhoneNumber.slice(0, 3)}) ${limitedPhoneNumber.slice(3)}`;
    } else if (limitedPhoneNumber.length > 0) {
      return `(${limitedPhoneNumber}`;
    }
    return '';
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handlePrevScreen = () => {
    const screens = ['call-button', 'ringing', 'screen3', 'screen4', 'screen5', 'screen6'];
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex > 0) {
      setCurrentScreen(screens[currentIndex - 1]);
    }
  };

  // Reusable Privacy Shield Component
  const PrivacyShield = () => (
    <div className="privacy-sheildDiv">
      <img
        src={IconAlyson}
        className="user-avatar"
        alt="Alyson Icon"
      />
      <span className="privacy-sheildBtn">Privacy Shield Enabled</span>
    </div>
  );

  // Render Screen Content
  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'call-button':
        return (
          <div className="call-screen-one">
            <div className="call-header">
              <PrivacyShield />
            </div>
            <div className="call-content">
              <h1 className="call-title">Your offer is almost ready!</h1>
              <p className="call-description">
                Click the button below to verify your ownership and complete your offer.
              </p>
              <div className="call-illustration">
                <img 
                  src={Home}
                  alt="House illustration" 
                  style={{ width: '200px', height: '280px', objectFit: 'cover', borderRadius: '12px' }}
                />
              </div>
              <button className="call-now-button" onClick={handleConnectStreamsCall}>
                <span className="call-icon" style={{ color: '#000000' }}>▶</span>
                <span className="call-text">Call Us Now</span>
              </button>
              <p className="call-subtitle">
                Just click the button and your phone will ring. It's that simple!
              </p>
            </div>
          </div>
        );

      case 'ringing':
        return (
          <div className="call-screen-two">
            <button className="call-back-button" onClick={handlePrevScreen}>
              ←
            </button>
            <div className="call-header">
              <PrivacyShield />
            </div>
            <div className="ringing-content">
              <h1 className="call-title">Your phone is ringing!</h1>
              <p className="call-description">
                We are calling from <strong>(888) 571-2380</strong>.<br />
                Please pick up to review your quote!
              </p>
              <div className="ringing-illustration">
                <img 
                  src="https://via.placeholder.com/200x300/FFBA2A/FFFFFF?text=Phone+Image" 
                  alt="Phone ringing illustration" 
                  style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '12px' }}
                />
              </div>
            </div>
          </div>
        );

      case 'screen3':
        return (
          <div className="call-screen-one">
            <div className="call-header">
              <PrivacyShield />
            </div>
            <div className="call-content">
              <h1 className="call-title">Call complete!</h1>
              <p className="call-description">
                If you need to call back, please call <strong>(855) 571-2380</strong>.<br />
                Our agents will assist you!
              </p>
              <div className="call-illustration">
                <img 
                  src="https://via.placeholder.com/200x280/FFBA2A/FFFFFF?text=Call+Complete+Image" 
                  alt="Call complete illustration" 
                  style={{ width: '200px', height: '280px', objectFit: 'cover', borderRadius: '12px' }}
                />
              </div>
            </div>
          </div>
        );

      case 'screen4':
        return (
          <div className="call-screen-one">
            <div className="call-header">
              <PrivacyShield />
            </div>
            <div className="call-content">
              <h1 className="call-title">Sorry, we missed you</h1>
              <div className="call-illustration">
                <img 
                  src="https://via.placeholder.com/200x280/FFBA2A/FFFFFF?text=Missed+Call+Image" 
                  alt="Missed call illustration" 
                  style={{ width: '200px', height: '280px', objectFit: 'cover', borderRadius: '12px' }}
                />
              </div>
              <button className="change-number-button" onClick={handleChangeNumber}>
                Change the number we call?
              </button>
              <button className="call-again-button" onClick={handleCallMeAgain}>
                Call me again now on the same number.
              </button>
              <p className="cant-talk-link" onClick={onClose}>
                I can't talk right now
              </p>
            </div>
          </div>
        );

      case 'screen5':
        return (
          <div className="call-screen-one">
            <div className="call-header">
              <PrivacyShield />
            </div>
            <div className="call-content">
              <h1 className="call-title">Screen 5 Content</h1>
              <p className="call-description">This is screen 5 - ready for your content!</p>
            </div>
          </div>
        );

      case 'screen6':
        return (
          <div className="call-screen-one">
            <div className="call-header">
              <PrivacyShield />
            </div>
            <div className="call-content">
              <h1 className="call-title">Screen 6 Content</h1>
              <p className="call-description">This is screen 6 - ready for your content!</p>
            </div>
          </div>
        );

      case 'change-number':
        return (
          <div className="call-screen-one">
            <div className="call-header">
              <PrivacyShield />
            </div>
            <div className="call-content">
              <h1 className="call-title">Sorry, we missed you</h1>
              <p className="call-description">Change the number we call?</p>
              <div className="phone-input-container">
                <input 
                  type="tel" 
                  className="phone-input" 
                  placeholder="(978) 615-2265"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={14}
                />
              </div>
              <div className="spacer-for-buttons"></div>
              <button className="call-now-button" onClick={handleConnectStreamsCallWithCustomPhone}>
                <span className="call-icon" style={{ color: '#000000' }}>▶</span>
                <span className="call-text">Call Me Now</span>
              </button>
               <p className="cant-talk-link" onClick={onClose}>
                I can't talk right now
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="call-modal-overlay">
      <div className="call-modal-container">
        <div className="call-modal-inner-container">
          {/* Render Current Screen */}
          {renderScreenContent()}
        </div>
        
        {/* Close Button - Parent Level */}
        <button className="call-close-button" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default CallMeNowModal;
