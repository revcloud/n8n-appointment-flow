import React, { useState, useEffect } from 'react';
import './index.css';
import HeroSection from '../../components/HeroSection';
import ThankYouContent from '../../components/ThankYouContent';
import TestimonialSection from '../../components/TestimonialSection';
import ClientTestimonials from '../../components/ClientTestimonials';
import AvailabilityScheduleModalWithAgentsV1 from '../../components/AvailabilityScheduleModalWithAgentsV1';
import AgentDetailsModalV1 from '../../components/AgentDetailsModalV1';

const ThankYouPageWithAgentsV1 = () => {
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(true);
  const [showAgentDetailsModal, setShowAgentDetailsModal] = useState(false);
  const [availabilityData, setAvailabilityData] = useState(null);

  useEffect(() => {
    // Track that we're showing the availability screen first
  }, []);

  const handleAvailabilityConfirm = (appointmentDetails) => {
    // Store availability data and show agent details modal
    setAvailabilityData(appointmentDetails);
    setShowAvailabilityModal(false);
    setShowAgentDetailsModal(true);
  };

  const handleAgentDetailsClose = () => {
    setShowAgentDetailsModal(false);
  };

  const handleAgentDetailsBack = () => {
    setShowAgentDetailsModal(false);
    setShowAvailabilityModal(true);
  };

  const handleAvailabilityClose = () => {
    setShowAvailabilityModal(false);
  };

  return (
    <div className="thank-you-page-agents">
      <div className="agents-experience-container">
        <HeroSection />
        <ThankYouContent />
        <TestimonialSection />
        <ClientTestimonials />
      </div>

      {/* Show availability modal first */}
      <AvailabilityScheduleModalWithAgentsV1
        isOpen={showAvailabilityModal}
        onClose={handleAvailabilityClose}
        onConfirm={handleAvailabilityConfirm}
      />

      {/* Show agent details modal second */}
      <AgentDetailsModalV1
        isOpen={showAgentDetailsModal}
        onClose={handleAgentDetailsClose}
        onBack={handleAgentDetailsBack}
        appointmentData={availabilityData}
      />
    </div>
  );
};

export default ThankYouPageWithAgentsV1;
