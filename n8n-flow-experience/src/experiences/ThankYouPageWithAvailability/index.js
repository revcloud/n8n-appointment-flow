import React, { useState } from 'react';
import './index.css';
import HeroSection from '../../components/HeroSection';
import ThankYouContent from '../../components/ThankYouContent';
import TestimonialSection from '../../components/TestimonialSection';
import ClientTestimonials from '../../components/ClientTestimonials';
import AvailabilityScheduleModal from '../../components/AvailabilityScheduleModal';

const ThankYouPageWithAvailability = () => {
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(true);

  const handleAvailabilityConfirm = (appointmentDetails) => {
    setShowAvailabilityModal(false);
  };

  const handleAvailabilityClose = () => {
    setShowAvailabilityModal(false);
  };

  return (
    <div className="thank-you-page">
      <div className="thank-you-page-container">
        <HeroSection />
        <ThankYouContent />
        <TestimonialSection />
        <ClientTestimonials />
      </div>

      <AvailabilityScheduleModal
        isOpen={showAvailabilityModal}
        onClose={handleAvailabilityClose}
        onConfirm={handleAvailabilityConfirm}
      />
    </div>
  );
};

export default ThankYouPageWithAvailability;
