import React, { useState, useEffect } from 'react';
import './AvailabilityScheduleModalWithAgents.css';
import alysonLogo from '../assets/alyson_logo.png';
import { sendPostLeadEvent } from '../utils/segmentEvents';
import { trackAppointmentDetails, trackConsultationSelection, trackAgentInfo, trackN8nFlowTriggered, trackN8nApiResponse } from '../utils/trackingManager';
import { getCurrentAgent, extractZipFromAddress } from '../utils/agentManager';

const days = [
  { key: "weekdays", label: "Weekdays", emoji: "" },
  { key: "saturday", label: "Saturday", emoji: "" },
  { key: "sunday", label: "Sunday", emoji: "" },
];

const slots = [
  { key: "morning", label: "Morning (6am-10am)" },
  { key: "midday", label: "Mid-day (10am-2pm)" },
  { key: "afternoon", label: "Afternoon (2pm-6pm)" },
  { key: "evening", label: "Evening (6pm-9pm)" },
];

const AvailabilityScheduleModalWithAgentsV1 = ({ isOpen, onClose, onConfirm }) => {
  const [selected, setSelected] = useState({
    weekdays: {},
    saturday: {},
    sunday: {}
  });
  const [isFlexible, setIsFlexible] = useState(false);
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [message, setMessage] = useState("");
  const [agentData, setAgentData] = useState(null);
  const [zipCode, setZipCode] = useState("");

  // Track appointment details when modal opens and prevent background scrolling
  React.useEffect(() => {
    if (isOpen) {
      // Update agent data when modal opens
      const agent = getCurrentAgent();
      setAgentData(agent);
      
      // Extract zip_code from address (quiz_address or prepop_address)
      const urlParams = new URLSearchParams(window.location.search);
      const quizAddress = urlParams.get('quiz_address');
      const prepopAddress = urlParams.get('prepop_address');
      
      let zip_code = "";
      if (quizAddress) {
        zip_code = extractZipFromAddress(quizAddress) || "";
        setZipCode(zip_code)
      } else if (prepopAddress) {
        zip_code = extractZipFromAddress(prepopAddress) || "";
        setZipCode(zip_code)
      }
      
      // Set appointment type to empty string for this experience
      trackConsultationSelection('');
      trackAppointmentDetails('');
      
      // Track agent info with zip_code
      trackAgentInfo(agent?.name || "", agent?.phone || "", zip_code);
      
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Restore background scrolling when modal closes
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCheckboxChange = (dayKey, slotKey) => {
    setSelected((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [slotKey]: !prev?.[dayKey]?.[slotKey],
      },
    }));
  };

  // Format availability matrix
  const formatAvailabilityMatrix = (selected) => {
    const availability = {};

    const days = ['weekdays', 'saturday', 'sunday'];
    const slots = ['morning', 'midday', 'afternoon', 'evening'];

    // Initialize all combinations
    days.forEach(day => {
      slots.forEach(slot => {
        const key = `${day}_${slot}`;
        availability[key] = false;
      });
    });

    // Set selected combinations
    if (selected) {
      Object.keys(selected).forEach(day => {
        if (selected[day]) {
          Object.keys(selected[day]).forEach(slot => {
            if (selected[day][slot]) {
              const key = `${day}_${slot}`;
              availability[key] = true;
            }
          });
        }
      });
    }

    return availability;
  };

  const handleConfirm = async () => {
    const formattedAvailability = formatAvailabilityMatrix(selected);

    const appointmentDetails = {
      availability: formattedAvailability,
      is_flexible: isFlexible,
      message: message.trim(),
      time_zone: timezone,
    };

    // Update tracking manager with appointment details
    trackAppointmentDetails(appointmentDetails);

    // Track that n8n flow was triggered (user clicked confirm button)
    trackN8nFlowTriggered("Yes");

    // Get URL parameters for dynamic data
    const urlParams = new URLSearchParams(window.location.search);
    
    // Format phone number to standard format
    const formatPhoneNumber = (phone) => {
      if (!phone) return '+1111111111';
      
      // Remove all non-digit characters
      const digits = phone.replace(/\D/g, '');
      
      // If 11 digits, ignore the first one (country code)
      const phoneDigits = digits.length === 11 ? digits.slice(1) : digits;
      
      // Format as +1XXXXXXXXXX if we have 10 digits
      if (phoneDigits.length === 10) {
        return `+1${phoneDigits}`;
      }
      
      // Return as is if already formatted
      return phone.startsWith('+') ? phone : `+1${phone}`;
    };

    // Convert selected availability to the required format
    const convertAvailability = () => {
      const availability = {
        weekdays_morning: false,
        weekdays_midday: false,
        weekdays_afternoon: false,
        weekdays_evening: false,
        saturday_morning: false,
        saturday_midday: false,
        saturday_afternoon: false,
        saturday_evening: false,
        sunday_morning: false,
        sunday_midday: false,
        sunday_afternoon: false,
        sunday_evening: false
      };

      // Map the selected times to the availability object
      Object.keys(selected).forEach(dayKey => {
        Object.keys(selected[dayKey]).forEach(slotKey => {
          if (selected[dayKey][slotKey]) {
            const availabilityKey = `${dayKey}_${slotKey}`;
            if (availability.hasOwnProperty(availabilityKey)) {
              availability[availabilityKey] = true;
            }
          }
        });
      });

      return availability;
    };

    // Trigger API call
    try {
       const apiPayload = {
        agent_name: agentData?.name || '',
        agent_phone: agentData?.phone || '',
        phone: formatPhoneNumber(urlParams.get('quiz_phone') || urlParams.get('prepop_phone')),
        name: urlParams.get('quiz_name') || urlParams.get('prepop_name') || '',
        email: urlParams.get('quiz_email') || urlParams.get('prepop_email') || '',
        is_flexible: true,
        message: message || "",
        availability: convertAvailability(),
        zip_code: zipCode || "",
        address_line_1: urlParams.get('quiz_address') || urlParams.get('prepop_address') || '',
        beds:urlParams.get('bedsCount') || '',
        baths:urlParams.get('bathsCount') || '',
      };

      const response = await fetch('https://alyson123.app.n8n.cloud/webhook/e04b7f3b-e1aa-4389-b386-4572c9e3a13f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload)
      });

      if (response.ok) {
        // Get response as text first
        const responseText = await response.text();
        console.log('API call successful, response:', responseText);
        
        // Try to parse as JSON, if it fails, use text as-is
        try {
          const responseData = JSON.parse(responseText);
          trackN8nApiResponse(JSON.stringify(responseData));
        } catch (e) {
          // If not JSON, store the text response
          trackN8nApiResponse(responseText || 'Success');
        }
      } else {
        const errorText = await response.text();
        console.error('API call failed:', response.status);
        // Track error response
        trackN8nApiResponse(`Error ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error('Error calling API:', error);
      // Track error
      trackN8nApiResponse(`Error: ${error.message}`);
    }

    // Send post_lead event after API call
    sendPostLeadEvent();

    if (onConfirm) {
      onConfirm(appointmentDetails);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="agents-availability-modal-overlay">
      <div className="agents-availability-modal-container">
        <div className="agents-availability-appointment-screen">
          <div className="agents-availability-appointment-container">
            {/* Modal Header */}
            <div className="agents-modal-header">
              <h1 className="agents-modal-title">When can we visit your property?</h1>
            </div>

            {/* Modal Content */}
            <div className="agents-modal-content">
              {/* Profile Details Section */}
              <div className="agents-profile-details-section">
                <div className="agents-profile-info">
                  <div className="agents-profile-left">
                    <div className="agents-profile-image">
                      <img src={agentData?.image} alt={agentData?.fullName || 'Agent'} />
                    </div>
                    <div className="agents-profile-rating">
                      <span className="agents-star-icon">⭐</span>
                      <span className="agents-rating-text">5.0</span>
                    </div>
                  </div>
                  <div className="agents-profile-content">
                    <h3 className="agents-profile-name">{agentData?.fullName || 'Agent'}</h3>
                    <div className="agents-profile-description">
                      <ul>
                        <li>{agentData?.description?.[0] || 'Your agent will visit your home to take photos and collect details so you can receive your cash offer within 24 hours of his visit.'}</li>
                        <li>{agentData?.description?.[1] || 'With over 20 years of experience and hundreds of successful home sales, your agent makes the process simple, transparent, and stress-free.'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Table */}
              <div className="agents-availability-table-container">
                <table className="agents-availability-table">
                  <thead>
                    <tr>
                      <th className="agents-availability-header">Availability</th>
                      {days.map((day) => (
                        <th key={day.key} className="agents-availability-day-header">
                          {day.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((slot) => (
                      <tr key={slot.key}>
                        <td className="agents-availability-slot-label">{slot.label}</td>
                        {days.map((day) => (
                          <td key={`${slot.key}-${day.key}`} className="agents-availability-checkbox-cell">
                            <input
                              type="checkbox"
                              checked={!!selected?.[day.key]?.[slot.key]}
                              onChange={() => handleCheckboxChange(day.key, slot.key)}
                              className="agents-availability-custom-checkbox"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Flexibility Toggle */}
              {/* <div className="agents-availability-flexibility-toggle">
                <label className="agents-availability-toggle-wrapper">
                  <input
                    type="checkbox"
                    checked={isFlexible}
                    onChange={() => setIsFlexible(!isFlexible)}
                    className="agents-availability-toggle-input"
                  />
                  <span className="agents-availability-toggle-slider"></span>
                </label>
                <span className="agents-availability-toggle-text">I'm flexible — reach out anytime</span>
              </div> */}

              {/* Special Instructions */}
              <div className="agents-availability-instructions-container">
                <input
                  className="agents-availability-instructions-input"
                  placeholder="Special instructions (Optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Time Zone */}
              <div className="agents-availability-timezone-container">
                <span className="agents-availability-timezone-label">Time zone</span>
                <div className="agents-availability-timezone-select-wrapper">
                  <span className="agents-availability-timezone-icon">🌎</span>
                  <select
                    className="agents-availability-timezone-select"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  >
                    <option value="America/New_York">US, Eastern Standard Time</option>
                    <option value="America/Chicago">US, Central Standard Time</option>
                    <option value="America/Denver">US, Mountain Standard Time</option>
                    <option value="America/Los_Angeles">US, Pacific Standard Time</option>
                    <option value="America/Anchorage">US, Alaska Standard Time</option>
                    <option value="Pacific/Honolulu">US, Hawaii Standard Time</option>
                    <option value="America/Phoenix">US, Arizona Standard Time</option>
                    <option value="UTC">Global, UTC</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="agents-modal-footer">
              <button className="agents-availability-continue-appointment" onClick={handleConfirm}>
                Confirm
              </button>
              <p className="agents-availability-confirmation-text">
                We'll reach out soon with a time that works for you.
              </p>
            </div>
          </div>
        </div>
        
        {/* Close Button - Parent Level */}
        <button className="agents-close-button" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default AvailabilityScheduleModalWithAgentsV1;
