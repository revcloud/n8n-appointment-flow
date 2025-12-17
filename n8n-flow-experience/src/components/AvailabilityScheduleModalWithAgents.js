import React, { useState, useEffect } from 'react';
import './AvailabilityScheduleModalWithAgents.css';
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

const AvailabilityScheduleModalWithAgents = ({ isOpen, onClose, onConfirm }) => {
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

  React.useEffect(() => {
    if (isOpen) {
      const agent = getCurrentAgent();
      setAgentData(agent);
      
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
      
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
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

  const formatAvailabilityMatrix = (selected) => {
    const availability = {};

    const days = ['weekdays', 'saturday', 'sunday'];
    const slots = ['morning', 'midday', 'afternoon', 'evening'];

    days.forEach(day => {
      slots.forEach(slot => {
        const key = `${day}_${slot}`;
        availability[key] = false;
      });
    });

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

    const urlParams = new URLSearchParams(window.location.search);
    
    const formatPhoneNumber = (phone) => {
      if (!phone) return '+1111111111';
      
      const digits = phone.replace(/\D/g, '');
      const phoneDigits = digits.length === 11 ? digits.slice(1) : digits;
      
      if (phoneDigits.length === 10) {
        return `+1${phoneDigits}`;
      }
      
      return phone.startsWith('+') ? phone : `+1${phone}`;
    };

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
        const responseText = await response.text();
        try {
          const responseData = JSON.parse(responseText);
        } catch (e) {
        }
      } else {
        const errorText = await response.text();
      }
    } catch (error) {
    }

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
            <div className="agents-modal-header">
              <h1 className="agents-modal-title">When can we visit your property?</h1>
            </div>

            <div className="agents-modal-content">
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

              <div className="agents-availability-instructions-container">
                <input
                  className="agents-availability-instructions-input"
                  placeholder="Special instructions (Optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

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
        
        <button className="agents-close-button" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default AvailabilityScheduleModalWithAgents;
