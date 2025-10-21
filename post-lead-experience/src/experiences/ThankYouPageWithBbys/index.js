import React, { useState, useEffect } from 'react';
import './index.css';
import HeroSection from '../../components/HeroSection';
import ThankYouContent from '../../components/ThankYouContent';
import TestimonialSection from '../../components/TestimonialSection';
import ClientTestimonials from '../../components/ClientTestimonials';
import AvailabilityScheduleModal from '../../components/AvailabilityScheduleModal';
import { sendPostLeadEvent } from '../../utils/segmentEvents';
import { trackConsultationSelection, trackAppointmentDetails, trackButtonClick } from '../../utils/trackingManager';

const ThankYouPageWithBbys = () => {
  const [showLoanModal, setShowLoanModal] = useState(true);
  const [showAppointment, setShowAppointment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set appointment type to empty string for BBYS experience
    trackConsultationSelection('');
    trackAppointmentDetails('');
  }, []);

  const handleAppointmentConfirm = (appointmentDetails) => {
    // Handle appointment confirmation
    console.log('Appointment confirmed:', appointmentDetails);
    
    // Update tracking manager with appointment details
    trackAppointmentDetails(appointmentDetails);
    
    // Send post_lead event to Segment
    sendPostLeadEvent();
    
    // Close the appointment modal
    setShowAppointment(false);
  };

  const handleYesClick = () => {
    // Set loading state
    setIsLoading(true);
    
    // Track that user clicked "Yes, I'm Interested" and send event immediately
    trackButtonClick('Interested');
    sendPostLeadEvent();
    
    // Build redirect URL with all parameters
    const urlParams = new URLSearchParams(window.location.search);
    const redirectParams = new URLSearchParams();
    
    // Add UTM parameters
    if (urlParams.get('utm_source')) redirectParams.set('utm_source', urlParams.get('utm_source'));
    if (urlParams.get('utm_campaign')) redirectParams.set('utm_campaign', urlParams.get('utm_campaign'));
    if (urlParams.get('utm_medium')) redirectParams.set('utm_medium', urlParams.get('utm_medium'));
    if (urlParams.get('utm_term')) redirectParams.set('utm_term', urlParams.get('utm_term'));
    if (urlParams.get('utm_content')) redirectParams.set('utm_content', urlParams.get('utm_content'));
    
    // Add user data - prefer quiz_ over prepop_, send as simple parameter names
    const name = urlParams.get('quiz_name') || urlParams.get('prepop_name');
    const email = urlParams.get('quiz_email') || urlParams.get('prepop_email');
    const phone = urlParams.get('quiz_phone') || urlParams.get('prepop_phone');
    const address = urlParams.get('quiz_address') || urlParams.get('prepop_address');
    
    if (name) redirectParams.set('name', name);
    if (email) redirectParams.set('email', email);
    if (phone) redirectParams.set('phone', phone);
    if (address) redirectParams.set('address', address);
    
    // Redirect to HomeLight buy before you sell page with parameters
    const redirectUrl = `https://www.homelight.com/buy-before-you-sell?${redirectParams.toString()}`;
    window.location.href = redirectUrl;
  };

  const handleNoClick = () => {
    // Track that user clicked "No, I'm not interested"
    trackButtonClick('Not_Interested');
    
    // Send post_lead event immediately with empty appointment data
    sendPostLeadEvent();
    
    // Close the loan modal (no appointment modal shown)
    setShowLoanModal(false);
  };

  return (
    <div className="thank-you-page-bbys">
      <div className="bbys-experience-container">
        <HeroSection />
        <ThankYouContent />
        <TestimonialSection />
        <ClientTestimonials />
      </div>

      {/* Dark Overlay Modal */}
      {showLoanModal && (
        <div className="bbys-overlay">
          <h2 className="bbys-modal-title">
            Would you like to learn about a Loan Program where you can buy your next home before you sell your current home?
          </h2>
          <div className="bbys-modal-buttons">
            <button 
              className={`bbys-button bbys-button-primary ${isLoading ? 'bbys-button-loading' : ''}`}
              onClick={handleYesClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="bbys-spinner"></span>
              ) : (
                "Yes, I'm Interested"
              )}
            </button>
            <button 
              className="bbys-button bbys-button-secondary" 
              onClick={handleNoClick}
              disabled={isLoading}
            >
              No, I'm not interested
            </button>
          </div>
        </div>
      )}

      {/* Show appointment screen when user clicks No */}
      <AvailabilityScheduleModal 
        isOpen={showAppointment}
        onClose={() => setShowAppointment(false)}
        onConfirm={handleAppointmentConfirm}
      />
    </div>
  );
};

export default ThankYouPageWithBbys;
