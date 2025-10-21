import React, { useState, useEffect } from 'react';
import './AgentDetailsModal.css';
import { getCurrentAgent, extractZipFromAddress } from '../utils/agentManager';
import { 
  trackAgentInfo, 
  trackN8nFlowTriggered, 
  trackN8nMsgReceived,
  trackConsultationSelection 
} from '../utils/trackingManager';
import { sendPostLeadEvent } from '../utils/segmentEvents';
import { sendResendMessageAPI } from '../api/connectStreams';

const AgentDetailsModal = ({ isOpen, onClose, onBack, appointmentData }) => {
  const [currentScreen, setCurrentScreen] = useState('received-text'); // 'received-text', 'resend-confirm'
  const [agentData, setAgentData] = useState(getCurrentAgent());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset to first screen when modal opens
      setCurrentScreen('received-text');
      // Update agent data when modal opens
      const agent = getCurrentAgent();
      setAgentData(agent);
      
      // Extract zip_code from address (quiz_address or prepop_address)
      const urlParams = new URLSearchParams(window.location.search);
      const quizAddress = urlParams.get('quiz_address');
      const prepopAddress = urlParams.get('prepop_address');
      
      let zipCode = "";
      if (quizAddress) {
        zipCode = extractZipFromAddress(quizAddress) || "";
      } else if (prepopAddress) {
        zipCode = extractZipFromAddress(prepopAddress) || "";
      }
      
      // Track agent info (includes zip_code) and set appointment_type to empty string for this flow
      trackAgentInfo(agent?.name || "", agent?.phone || "", zipCode);
      trackConsultationSelection(""); // Set appointment_type to empty string
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleReceivedText = () => {
    // Track that user received the text message
    trackN8nMsgReceived("Yes");
    // Send post_lead event immediately
    sendPostLeadEvent();
    handleClose();
  };

  const handleResendMessage = async () => {
    // Track that n8n flow was triggered (user clicked confirm/resend button)
    trackN8nFlowTriggered("Yes");
    
    // Get URL parameters for dynamic data
    const urlParams = new URLSearchParams(window.location.search);
    
    // Format phone number to standard format
    const formatPhoneNumber = (phone) => {
      if (!phone) return '+1111111111';
      
      // Remove all non-digit characters
      const digits = phone.replace(/\D/g, '');
      
      // If 11 digits, ignore the first one (country code)
      const phoneDigits = digits.length === 11 ? digits.slice(1) : digits;
      
      // Format as +1XXXXXXXXXX if we have 10 digits
      if (phoneDigits.length === 10) {
        return `+1${phoneDigits}`;
      }
      
      // Return as is if already formatted
      return phone.startsWith('+') ? phone : `+1${phone}`;
    };

    // API payload for resend message - use same data as first API hit
    const apiPayload = {
      agent_name: agentData?.name || '',
      agent_phone: agentData?.phone || '',
      phone: formatPhoneNumber(urlParams.get('quiz_phone') || urlParams.get('prepop_phone')),
      name: urlParams.get('quiz_name') || urlParams.get('prepop_name') || '',
      is_flexible: appointmentData?.is_flexible || false,
      message: appointmentData?.message || "",
      availability: appointmentData?.availability || {}
    };

    // Call API - it will handle response tracking and post_lead event
    await sendResendMessageAPI(apiPayload);
  };

  const handleClose = () => {
    setCurrentScreen('received-text');
    onClose();
  };

  // Privacy Shield Component
  const PrivacyShield = () => (
    <div className="agent-privacy-shield">
      <div className="privacy-shield-icon">🛡️</div>
      <span className="privacy-shield-text">Privacy Shield Enabled</span>
    </div>
  );

  // Render Screen Content
  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'received-text':
        return (
          <div className="agent-details-screen">
            <div className="agent-details-header">
              {/* <PrivacyShield /> */}
            </div>
            
            <div className="agent-details-content">
              <h1 className="agent-details-title">We just texted you and connected you with {agentData?.name || 'your agent'}!</h1>
              <p className="agent-details-description">
                Please coordinate directly with {agentData?.name || 'your agent'} to confirm the exact time he can come to your house.
              </p>
              
              <div className="agent-contact-card">
                <div className="agent-contact-info">
                  <div className="agent-profile-image">
                    <img 
                      src={agentData?.image} 
                      alt={agentData?.name || 'Agent'} 
                    />
                  </div>
                  <div className="agent-phone-info">
                    <div className="phone-icon">📞</div>
                    <span className="phone-label">Phone: </span>
                    <a href={`tel:${agentData?.phone}`} className="phone-number">{agentData?.phone || 'N/A'}</a>
                  </div>
                </div>
              </div>
              
              <button className="agent-confirmation-button" onClick={handleReceivedText}>
                I received the text message
              </button>
              
              <button className="agent-resend-button" onClick={handleResendMessage}>
                Resend Message
              </button>
              
              <div className="agent-footer-hint">
                {/* <div className="contact-hint-icon">⭐</div> */}
                <span className="contact-hint-text">
                  Add <strong>{agentData?.name || 'your agent'}</strong> to your contacts so you'll recognize their messages right away.
                </span>
              </div>
            </div>
          </div>
        );
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="agent-details-modal-overlay">
      <div className="agent-details-modal-container">
        <div className="agent-details-modal-inner">
          {/* Back Button */}
          {onBack && (
            <button className="agent-details-back-button" onClick={onBack}>
              ←
            </button>
          )}
          
          {/* Render Current Screen */}
          {renderScreenContent()}
        </div>
        
        {/* Close Button */}
        <button className="agent-details-close-button" onClick={handleClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default AgentDetailsModal;
