import React, { useState, useEffect } from 'react';
import './index.css';
import HeroSection from '../../components/HeroSection';
import ThankYouContent from '../../components/ThankYouContent';
import TestimonialSection from '../../components/TestimonialSection';
import ClientTestimonials from '../../components/ClientTestimonials';
import AvailabilityScheduleModal from '../../components/AvailabilityScheduleModal';

const ThankYouPageWithAvailability = () => {
  const [showAppointment, setShowAppointment] = useState(true);

  useEffect(() => {
    // Track that we're showing the appointment screen directly
    console.log('ThankYouPageWithAvailability loaded');
  }, []);

  const handleAppointmentConfirm = (appointmentDetails) => {
    // Handle appointment confirmation
    console.log('Appointment confirmed:', appointmentDetails);
    
    // Close the appointment modal
    setShowAppointment(false);
  };

  return (
    <div className="thank-you-page">
      <HeroSection />
      <ThankYouContent />
      <TestimonialSection />
      <ClientTestimonials />

      {/* Show appointment screen directly */}
      <AvailabilityScheduleModal 
        isOpen={showAppointment}
        onClose={() => setShowAppointment(false)}
        onConfirm={handleAppointmentConfirm}
      />
    </div>
  );
};

export default ThankYouPageWithAvailability;