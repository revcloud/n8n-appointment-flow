import React from 'react';
import './HeroSection.css';
import thankYouImage from '../assets/thank_you.png';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-image-container">
        <img
          src={thankYouImage}
          alt="Liberty Home Report - Cash for Houses"
          className="hero-image"
        />
      </div>
      <div className="hero-content">
        <div className="hero-brand">
          <img
            src="https://try.libertyhomereport.com/assets/logo_white.png"
            alt="Liberty Home Report Logo"
            className="hero-logo"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 