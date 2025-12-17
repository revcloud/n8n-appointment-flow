import React, { useState, useEffect } from 'react';
import './index.css';
import HeroSection from '../../components/HeroSection';
import ThankYouContent from '../../components/ThankYouContent';
import TestimonialSection from '../../components/TestimonialSection';
import ClientTestimonials from '../../components/ClientTestimonials';
import AvailabilityScheduleModalWithAgents from '../../components/AvailabilityScheduleModalWithAgents';
import AgentDetailsModal from '../../components/AgentDetailsModal';

const ThankYouPageWithAgents = () => {
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(true);
  const [showAgentDetailsModal, setShowAgentDetailsModal] = useState(false);
  const [availabilityData, setAvailabilityData] = useState(null);

  useEffect(() => {
  }, []);

  const handleAvailabilityConfirm = (appointmentDetails) => {
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

      <AvailabilityScheduleModalWithAgents
        isOpen={showAvailabilityModal}
        onClose={handleAvailabilityClose}
        onConfirm={handleAvailabilityConfirm}
      />

      <AgentDetailsModal
        isOpen={showAgentDetailsModal}
        onClose={handleAgentDetailsClose}
        onBack={handleAgentDetailsBack}
        appointmentData={availabilityData}
      />
    </div>
  );
};

export default ThankYouPageWithAgents;
