import React from 'react';
import './ClientTestimonials.css';

const ClientTestimonials = () => {
  return (
    <div className="client-testimonials">
      <div className="testimonials-container">
        {/* Main Heading */}
        <h2 className="testimonials-heading">
          What our clients say
        </h2>

        {/* Rating Section */}
        <div className="rating-section">
          <div className="rating-display">
            <span className="rating-number">4.8</span>
            <div className="stars">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
               <p className="rating-description">
            Google rating based on over <span className="highlight">240+ reviews</span>
          </p>
          </div>
       
        </div>

        {/* Testimonial Content */}
        <div className="testimonials-list">
          {/* First Testimonial */}
          <div className="testimonial-item">
            {/* <span className="quote-mark">"</span> */}
            <div className="testimonial-content">
              <div className="testimonial-header">
                <div className="client">
                  <h3 className="client-name">Lisa McGregor Peters</h3>

                </div>
                <span className="testimonial-date">a month ago</span>
              </div>
              <p className="client-role">Sold with a Trusted Home Offers agent</p>
              <p className="testimonial-text">
                I live in Florida so selling a home in Valley Village, CA needed to be handled by a reliable, trustworthy, competent team with excellent communication and coordination skills and experience working with a 1031 exchange facilitator. Trusted Home Offers met those requirements and worked well with the realtor's team and the sale was handled quickly, drama-free and flawlessly. I would recommend the Trusted Home Offers team for anyone who desires a stress free transaction
              </p>
            </div>
          </div>
          <div className="testimonial-item">
            {/* <span className="quote-mark">"</span> */}
            <div className="testimonial-content">
              <div className="testimonial-header">
                <div className="client">
                  <h3 className="client-name">William Smith</h3>

                </div>
                <span className="testimonial-date">a month ago</span>
              </div>
              <p className="client-role">Sold with a Trusted Home Offers agent</p>
              <p className="testimonial-text">
                I highly recommend Trusted Home Offers when looking for a realtor. After living in our home for 38 years, I had no idea which realtor to choose to help us with selling our home. Trusted Home Offers offered me the names of 3 top realtors in my area. My wife and I decided to go with one of these individuals. It was a smart decision. Our Trusted Home Offers realtor was extremely knowledgeable and gave us some good tips as to the things we needed to do before putting our house on the market. Once we completed the improvements to our house as suggested, our realtor was able to get the house on the market right away. Within 2 days, we received a full price offer on our home. And, I just received my commission rebate from Trusted Home Offers in the mail yesterday. Thanks Trusted Home Offers for making the process of selling our home so much easier!
              </p>
            </div>
          </div>
          <div className="testimonial-item">
            {/* <span className="quote-mark">"</span> */}
            <div className="testimonial-content">
              <div className="testimonial-header">
                <div className="client">
                  <h3 className="client-name">Buddy Villatoro</h3>

                </div>
                <span className="testimonial-date">a month ago</span>
              </div>
              <p className="client-role">Sold with a Trusted Home Offers agent</p>
              <p className="testimonial-text">
                As first-time home sellers, we were overwhelmed with advice and recommendations from friends, ads in the mail, unreliable, confusing, contradictory results from online search engines. The well-known real estate sites seemed to complicate the process even more. Turning to Trusted Home Offers was just what we needed. Our Trusted Home Offers representative was a great help at the start our process. No other site or resource offered that type of attention and service. The search for agents provided two names who knew our neighborhood and our town, and the top choice had just sold a home on our street a few days before. The reviews were clear and objective; the information, reliable; and the results, well presented. We contacted the two agents. Both responded quickly, and both scheduled meetings in two days. We ultimately hired the top choice. And we had a bid on our house in twenty-one days, and the buyers’ appraiser settled on the exact agreed selling price—just as our agent predicted. I highly recommend Trusted Home Offers. In just minutes, it helped us find the type of agent we wanted and needed.
              </p>
            </div>
          </div>
          <div className="testimonial-item">
            {/* <span className="quote-mark">"</span> */}
            <div className="testimonial-content">
              <div className="testimonial-header">
                <div className="client">
                  <h3 className="client-name">
                    MK Siemionko
                  </h3>

                </div>
                <span className="testimonial-date">a month ago</span>
              </div>
              <p className="client-role">Sold with a Trusted Home Offers agent</p>
              <p className="testimonial-text">
                Trusted Home Offers made finding the perfect real estate agent a breeze. By providing me with a listing of proven professionals, I was able to "shop around" to find not only a good real estate agent, but the best realtor for my area and for the sale of my house. Through that realtor I was also able to secure a team of additional professionals to assist me with the sale of my home in New York. By essentially prescreening real estate professionals for me, Trusted Home Offers took away any issues that may have arisen via "guesswork" in trying to find the perfect real estate agent, which was incredibly important as I was out of state after listing and required a tried and true expert to help me with the process remotely. If I do end up moving again, I will 100% use Trusted Home Offers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;
