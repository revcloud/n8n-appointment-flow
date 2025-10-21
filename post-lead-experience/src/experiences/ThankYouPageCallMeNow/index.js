import { useState } from 'react';
import CallMeNowModal from '../../components/CallMeNowModal';
import HeroSection from '../../components/HeroSection';
import ThankYouContent from '../../components/ThankYouContent';
import TestimonialSection from '../../components/TestimonialSection';
import ClientTestimonials from '../../components/ClientTestimonials';
import './index.css';

const ThankYouPageCallMeNow = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="thank-you-page-call-me-now">
      <HeroSection />
      <ThankYouContent />
      <TestimonialSection />
      <ClientTestimonials />
      <CallMeNowModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default ThankYouPageCallMeNow;

