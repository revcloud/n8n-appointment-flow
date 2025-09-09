import React, { useState } from 'react';
import './AppointmentScreen.css';
import alysonLogo from '../assets/alyson_logo.png';

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

const AppointmentScreen = ({ onBack, onConfirm }) => {
  const [selected, setSelected] = useState({
    weekdays: { afternoon: true, evening: true },
    saturday: { evening: true },
    sunday: {}
  });
  const [isFlexible, setIsFlexible] = useState(false);
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [message, setMessage] = useState("");

  const handleCheckboxChange = (dayKey, slotKey) => {
    setSelected((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [slotKey]: !prev?.[dayKey]?.[slotKey],
      },
    }));
  };

  const handleConfirm = () => {
    const appointmentDetails = {
      selected,
      isFlexible,
      message: message.trim(),
      timezone,
    };
    
    if (onConfirm) {
      onConfirm(appointmentDetails);
    }
  };

  return (
    <div className="appointment-screen">
      <div className="appointment-container">
        {/* Modal Header */}
        <div className="modal-header">
     

          {/* Back Button */}
          <div className="appointment-back">
            <button className="back-button" onClick={onBack}>
              <span className="back-arrow">←</span>
              Back
            </button>
          </div>

          <h2 className="modal-title">When are you usually free?</h2>
          <p className="modal-description">
            We'll text or email you a specific time based on your general availability.
          </p>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          {/* Availability Table */}
          <div className="availability-table-container">
        <table className="availability-table">
          <thead>
            <tr>
              <th className="availability-header">Availability</th>
              {days.map((day) => (
                <th key={day.key} className="day-header">
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.key}>
                <td className="slot-label">{slot.label}</td>
                {days.map((day) => (
                  <td key={`${slot.key}-${day.key}`} className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={!!selected?.[day.key]?.[slot.key]}
                      onChange={() => handleCheckboxChange(day.key, slot.key)}
                      className="custom-checkbox"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          </table>
          </div>

          {/* Flexibility Toggle */}
          <div className="flexibility-toggle">
            <label className="toggle-wrapper">
              <input
                type="checkbox"
                checked={isFlexible}
                onChange={() => setIsFlexible(!isFlexible)}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-text">I'm flexible — reach out anytime</span>
          </div>

          {/* Special Instructions */}
          <div className="instructions-container">
            <input
              className="instructions-input"
              placeholder="Special instructions for the visit (Optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Time Zone */}
          <div className="timezone-container">
            <span className="timezone-label">Time zone</span>
            <div className="timezone-select-wrapper">
              <span className="timezone-icon">🌎</span>
              <select
                className="timezone-select"
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
        <div className="modal-footer">
          <button className="continue-appointment" onClick={handleConfirm}>
            Confirm & Save
          </button>
          <p className="confirmation-text">
            We'll reach out soon with a time that works for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScreen;
