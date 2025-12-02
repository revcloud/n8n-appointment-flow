import React, { useState, useEffect } from 'react';
import './TestimonialSection.css';

const TestimonialSection = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const targetCount = 689600;

  useEffect(() => {
    // Intersection Observer to trigger animation when component comes into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('.client-count-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 800; // 0.8 seconds - much faster
    const steps = 30; // 30 steps for quick animation
    const increment = targetCount / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newCount = Math.min(Math.floor(increment * currentStep), targetCount);
      setCount(newCount);

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(targetCount);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, targetCount]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="testimonial-section">
      <div className="testimonial-container">
        {/* Client Count Section */}
        <div className="client-count-section">
          <div className="client-number">
            {formatNumber(count)}+
          </div>
          <h2 className="client-count-heading">
            Happy clients and counting
          </h2>
        </div>

        {/* Testimonial Section */}
        <div className="testimonial-content">
          <div className="testimonial-text">
            {/* <span className="quote-mark">"</span> */}
            <p className="testimonial-paragraph">
              I would like to thank Trusted Home Reports for recommending sales persons for the sale of my house. Not being aware of what was offered in my area it was great to receive names of agents in my area who could help with my home sale. You provided me with three agents names, two of witch were excellent matches for the job, I selected Nicole Causey who did an outstanding job, I feel she went above and beyond what was required for the sale. Her selection was very much based on the information that you provided and feel that Trusted Home Reports provides a very good service to those who are unfamiliar with the real estate world.
            </p>
          </div>
          
        </div>

        {/* Call to Action Button */}
 <div className="client-info">
  <div className="client-avatar">
    <img
    src="https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/assets/v3/testimonial-m-3-fd80fffa8a7f1b3f314119c375ed5df47674ad25bb324e95e4e8806cd918c432.jpg"
      className="avatar-image"
    />
  </div>
  <div className="client-details">
    <div className="client">Earl S.</div>
    <div className="client-location">Fremont, CA, USA</div>
  </div>
</div>
      </div>
         <div className="cta-section">
          <button className="cta-button">
            VIEW ALL TESTIMONIALS
          </button>
        </div>
    </div>
  );
};

export default TestimonialSection;
