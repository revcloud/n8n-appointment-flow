import React, { useState, useEffect } from 'react';
import './AgentDetailsModal.css';
import { getCurrentAgent, extractZipFromAddress } from '../utils/agentManager';
import { sendResendMessageAPI } from '../api/connectStreams';

const AgentDetailsModal = ({ isOpen, onClose, onBack, appointmentData }) => {
  const [currentScreen, setCurrentScreen] = useState('received-text');
  const [agentData, setAgentData] = useState(getCurrentAgent());
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentScreen('received-text');
      const agent = getCurrentAgent();
      setAgentData(agent);

      const urlParams = new URLSearchParams(window.location.search);
      const quizAddress = urlParams.get('quiz_address');
      const prepopAddress = urlParams.get('prepop_address');

      let zip_code = "";
      if (quizAddress) {
        zip_code = extractZipFromAddress(quizAddress) || "";
        setZipCode(zip_code)
      } else if (prepopAddress) {
        zip_code = extractZipFromAddress(prepopAddress) || "";
        setZipCode(zip_code)
      }

    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleReceivedText = () => {
    handleClose();
  };

  const handleResendMessage = async () => {
    const urlParams = new URLSearchParams(window.location.search);

    const formatPhoneNumber = (phone) => {
      if (!phone) return '+1111111111';

      const digits = phone.replace(/\D/g, '');
      const phoneDigits = digits.length === 11 ? digits.slice(1) : digits;

      if (phoneDigits.length === 10) {
        return `+1${phoneDigits}`;
      }

      return phone.startsWith('+') ? phone : `+1${phone}`;
    };

    const apiPayload = {
      agent_name: agentData?.name || '',
      agent_phone: agentData?.phone || '',
      phone: formatPhoneNumber(urlParams.get('quiz_phone') || urlParams.get('prepop_phone')),
      name: urlParams.get('quiz_name') || urlParams.get('prepop_name') || '',
      email: urlParams.get('quiz_email') || urlParams.get('prepop_email') || '',
      is_flexible: true,
      message: appointmentData?.message || "",
      availability: appointmentData?.availability || {},
      zip_code: zipCode || "",
      address_line_1: urlParams.get('quiz_address') || urlParams.get('prepop_address') || '',
      beds: urlParams.get('bedsCount') || '',
      baths: urlParams.get('bathsCount') || '',
    };

    await sendResendMessageAPI(apiPayload);
  };

  const handleClose = () => {
    setCurrentScreen('received-text');
    onClose();
  };

  const PrivacyShield = () => (
    <div className="agent-privacy-shield">
      <div className="privacy-shield-icon">🛡️</div>
      <span className="privacy-shield-text">Privacy Shield Enabled</span>
    </div>
  );

  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'received-text':
        return (
          <div className="agent-details-screen">
            <div className="agent-details-header">
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
          {onBack && (
            <button className="agent-details-back-button" onClick={onBack}>
              ←
            </button>
          )}

          {renderScreenContent()}
        </div>

        <button className="agent-details-close-button" onClick={handleClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default AgentDetailsModal;
