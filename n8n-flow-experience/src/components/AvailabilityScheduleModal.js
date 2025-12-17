import React, { useState } from 'react';
import './AvailabilityScheduleModal.css';

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

const AvailabilityScheduleModal = ({ isOpen, onClose, onConfirm }) => {
  const [selected, setSelected] = useState({
    weekdays: {},
    saturday: {},
    sunday: {}
  });
  const [isFlexible, setIsFlexible] = useState(false);
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [message, setMessage] = useState("");

  React.useEffect(() => {
    if (isOpen) {
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

  const handleConfirm = () => {
    const formattedAvailability = formatAvailabilityMatrix(selected);

    const appointmentDetails = {
      availability: formattedAvailability,
      is_flexible: isFlexible,
      message: message.trim(),
      time_zone: timezone,
    };

    if (onConfirm) {
      onConfirm(appointmentDetails);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="availability-modal-overlay">
      <div className="availability-modal-container">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="availability-appointment-screen">
          <div className="availability-appointment-container">
            <div className="modal-header">
              <h2 className="modal-title">When can we visit your property?</h2>
              <p className="modal-description">
                We'll coordinate with your selected agent to schedule a convenient time for your property evaluation. Select your preferred time slots and we'll confirm the exact appointment time.
              </p>
            </div>

            <div className="modal-content">
              <div className="availability-table-container">
                <table className="availability-table">
                  <thead>
                    <tr>
                      <th className="availability-header">Availability</th>
                      {days.map((day) => (
                        <th key={day.key} className="availability-day-header">
                          {day.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((slot) => (
                      <tr key={slot.key}>
                        <td className="availability-slot-label">{slot.label}</td>
                        {days.map((day) => (
                          <td key={`${slot.key}-${day.key}`} className="availability-checkbox-cell">
                            <input
                              type="checkbox"
                              checked={!!selected?.[day.key]?.[slot.key]}
                              onChange={() => handleCheckboxChange(day.key, slot.key)}
                              className="availability-custom-checkbox"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="availability-flexibility-toggle">
                <label className="availability-toggle-wrapper">
                  <input
                    type="checkbox"
                    checked={isFlexible}
                    onChange={() => setIsFlexible(!isFlexible)}
                    className="availability-toggle-input"
                  />
                  <span className="availability-toggle-slider"></span>
                </label>
                <span className="availability-toggle-text">I'm flexible — reach out anytime</span>
              </div>

              <div className="availability-instructions-container">
                <input
                  className="availability-instructions-input"
                  placeholder="Special instructions (Optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="availability-timezone-container">
                <span className="availability-timezone-label">Time zone</span>
                <div className="availability-timezone-select-wrapper">
                  <span className="availability-timezone-icon">🌎</span>
                  <select
                    className="availability-timezone-select"
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

            <div className="modal-footer">
              <button className="availability-continue-appointment" onClick={handleConfirm}>
                Confirm
              </button>
              <p className="availability-confirmation-text">
                We'll reach out soon with a time that works for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityScheduleModal;