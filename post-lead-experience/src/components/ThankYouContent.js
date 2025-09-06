import React from 'react';
import './ThankYouContent.css';

const ThankYouContent = () => {
  return (
    <div className="thank-you-content">
      <div className="content-container">
        <h1 className="main-heading">
          Thank you! We will now match you with the highest bidder.
        </h1>
        
        <div className="content-body">
          <p className="intro-paragraph">
            <span className="drop-cap">T</span>rusted Home Offers is now reaching out to their network of hundreds of qualified cash buyers and investors to get you a top offer on your home. They have helped thousands of homeowners who've felt this is the best way to sell their home quickly, and stress free.
          </p>
          
          <div className="benefits-section">
            <h2 className="benefits-heading">
              Benefits of working with Trusted Home Offers:
            </h2>
            <ul className="benefits-list">
              <li>Tap the largest cash buyer network in the US, including iBuyers and long-term investors.</li>
              <li>They handle all the buyer-side costs and paperwork.</li>
              <li>Get all cash offers.</li>
              <li>Their network buys your home as-is, in any condition.</li>
            </ul>
          </div>
          
          <p className="conclusion-paragraph">
            Here's the best part: if you decide to accept the offer, you choose your own move date. Plus you could sell and get money in your bank account in as soon as 7 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouContent; 