import React, { useState, useEffect } from 'react';
import { HomeFilled, PhoneFilled, VideoCameraFilled } from '@ant-design/icons';
import './OfferModal.css';
import AppointmentScreen from './AppointmentScreen';
import { trackConsultationSelection, trackAppointmentDetails } from '../utils/trackingManager';
import { sendPostLeadEvent } from '../utils/segmentEvents';

const OfferModal = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState('phone');
  const [currentScreen, setCurrentScreen] = useState('offer'); // 'offer' or 'appointment'

  // Format phone number to standard format
  const formatPhoneNumber = (phone) => {
    if (!phone) return '123-456-7890';
    
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // If 11 digits, ignore the first one (country code)
    const phoneDigits = digits.length === 11 ? digits.slice(1) : digits;
    
    // Format as XXX-XXX-XXXX if we have 10 digits
    if (phoneDigits.length === 10) {
      return `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`;
    }
    
    // If already formatted or other format, return as is
    return phone;
  };

  // Get dynamic values from URL parameters
  const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      phone: formatPhoneNumber(urlParams.get('quiz_phone') || '123-456-7890'), // Formatted phone
      email: urlParams.get('quiz_email') || 'user@revcloud.com', // Default email
      address: urlParams.get('quiz_address') || '123 address', // Default address
    };
  };

  const urlParams = getUrlParams();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Track default phone selection when modal opens
      trackConsultationSelection('phone_call');
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleContinue = () => {
    // Send post_lead event (1st button)
    sendPostLeadEvent();
    
    setCurrentScreen('appointment');
  };

  const handleBackToOffer = () => {
    setCurrentScreen('offer');
  };

  const handleAppointmentConfirm = (appointmentDetails) => {
    // Track appointment details
    trackAppointmentDetails(appointmentDetails);
    
    // Send post_lead event (2nd button)
    sendPostLeadEvent();
    
    // Handle appointment confirmation here
    onClose(); // Close modal after confirmation
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-inner-container">
          {/* Close Button */}
          <button className="close-button" onClick={onClose}>
            ×
          </button>

          {currentScreen === 'offer' ? (
            <>
              {/* Modal Header */}
              <div className="modal-header">
                <h2 className="modal-title">
                  Avoids Delays or Adjustments Later, Faster Offer Turnaround
                </h2>
                <p className="modal-description">
                  Choose your preferred consultation method. In-person visits provide the most comprehensive property evaluation.
                </p>
              </div>

              {/* Modal Content */}
              <div className="modal-content">
          {/* Fast Offer Section */}
          <div 
            className={`option-card ${selectedOption === 'home' ? 'selected' : ''}`}
            onClick={() => {
              setSelectedOption('home');
              trackConsultationSelection('in_person');
            }}
          >
            <div className="option-content">
              <HomeFilled className="house-icon"/>
              <div className="option-text">
                <h3 className="option-title">I want my best offer, fast. Let's meet at <strong>{urlParams?.address}</strong>.</h3>
                <p className="option-subtitle">Your onsite visits are required to get a verified offer.</p>
              </div>
            </div>
          </div>

          {/* Talk First Section */}
          <div className="option-card">
            <h3 className="option-title">I am not quite ready for an on site visit but I would like to learn more first</h3>
            
            <div className="contact-options">
              {/* Phone Call Option */}
              <div 
                className={`contact-option ${selectedOption === 'phone' ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedOption('phone');
                  trackConsultationSelection('phone_call');
                }}
              >
                <PhoneFilled className="option-icon"/>
                <div className="option-details">
                  <h4 className="option-name">Phone Call</h4>
                  <p className="option-info">We will call you at<br />{urlParams?.phone}</p>
                </div>
              </div>

              {/* Video Call Option */}
              <div 
                className={`contact-option ${selectedOption === 'video' ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedOption('video');
                  trackConsultationSelection('video_call');
                }}
              >
                <VideoCameraFilled className="option-icon"/>
                <div className="option-details">
                  <h4 className="option-name">Video Call (Zoom)</h4>
                  <p className="option-info">We will send a zoom link to<br />{urlParams?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose In-Person Section */}
          <div className="option-card">
            <div className="recommended-header">
              <h3 className="option-title">🌟 Why choose in-person?</h3>
              <span className="recommended-badge">Recommended</span>
            </div>
            
            <ul className="benefits-list">
              <li>Sell your home "As Is"</li>
              <li>Close in as few as 7 days</li>
              <li>No open houses</li>
              <li>No agent commissions or fees</li>
              <li>No hassle, no stress</li>
            </ul>
          </div>
        </div>

              {/* Continue Button */}
              <div className="modal-footer">
                <button className="continue-button" onClick={handleContinue}>
                  Continue
                </button>
              </div>
            </>
          ) : (
            <AppointmentScreen 
              onBack={handleBackToOffer}
              onConfirm={handleAppointmentConfirm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
