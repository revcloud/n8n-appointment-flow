import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/HeroSection';
import ThankYouContent from '../../components/ThankYouContent';
import TestimonialSection from '../../components/TestimonialSection';
import ClientTestimonials from '../../components/ClientTestimonials';
import OfferModal from '../../components/OfferModal';

const ThankYouPage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal when page loads/reloads
    setShowModal(true);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="thank-you-page">
      <HeroSection />
      <ThankYouContent />
      <TestimonialSection />
      <ClientTestimonials />
      <OfferModal isOpen={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default ThankYouPage; 