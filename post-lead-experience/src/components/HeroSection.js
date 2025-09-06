import React from 'react';
import './HeroSection.css';
import thankYouImage from '../assets/thank_you.png';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-image-container">
        <img
          src={thankYouImage}
          alt="Trusted Home Offers - Cash for Houses"
          className="hero-image"
        />
      </div>
      <div className="hero-content">
        <div className="hero-brand">
          <img
            src="https://try.trustedhomereports.com/assets/trusted-home-reports-logo-white.png"
            alt="Trusted Home Reports Logo"
            className="hero-logo"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 