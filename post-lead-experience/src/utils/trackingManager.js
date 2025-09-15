// Simple Tracking Manager - Just stores data for Segment events

// Get URL parameters
const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        // Page properties
        path: window.location.pathname || '',
        referrer: document.referrer || '',
        search: window.location.search || '',
        title: document.title || '',
        url: window.location.href || '',
        // UTM and tracking properties (from URL)
        utmSource: urlParams.get('utm_source') || '',
        utmCampaign: urlParams.get('utm_campaign') || '',
        utmMedium: urlParams.get('utm_medium') || '',
        utmTerm: urlParams.get('utm_term') || '',
        utmContent: urlParams.get('utm_content') || '',
        sessionId: urlParams.get('sessionId') || '',
        checkoutId: urlParams.get('checkoutId') || '161',
        experiment_id: urlParams.get('eid') || '96',
        // Quiz properties from URL
        quiz_name: urlParams.get('quiz_name') || '',
        quiz_email: urlParams.get('quiz_email') || '',
        quiz_phone: urlParams.get('quiz_phone') || '',
        quiz_address: urlParams.get('quiz_address') || '',
        prepop_name: urlParams.get('prepop_name') || '',
        prepop_email: urlParams.get('prepop_email') || '',
        prepop_phone: urlParams.get('prepop_phone') || '',
        prepop_address: urlParams.get('prepop_address') || '',
        cookee_id: urlParams.get('sessionId') || '',

    };
};

// Simple tracking data storage
let trackingData = {
    appointment_type: "phone_call", // Default to phone
    appointment_details: "",
};

// Set consultation type
export const trackConsultationSelection = (type) => {
    trackingData.appointment_type = type;
};

// Set appointment details
export const trackAppointmentDetails = (details) => {
    trackingData.appointment_details = details;
};

// Get appointment details object
const getAppointmentDetailsObject = () => {
    if (!trackingData.appointment_details) {
        return ""; // Empty string for 1st button
    }

    // AppointmentScreen now sends formatted data directly
    return trackingData.appointment_details;
};

// Get data for Segment events
export const getSegmentData = () => {
    // Get URL parameters dynamically
    const urlParams = getUrlParams();

    return {
        appointment_type: trackingData.appointment_type, // Direct values: 'home', 'phone', 'video'
        appointment_details: getAppointmentDetailsObject(),
        // Quiz properties (from URL)
        quiz_name: urlParams.quiz_name || "",
        quiz_email: urlParams.quiz_email || "",
        quiz_phone: urlParams.quiz_phone || "",
        quiz_address: urlParams.quiz_address || "",
         // Quiz properties (from URL)
        prepop_name: urlParams.prepop_name || "",
        prepop_email: urlParams.prepop_email || "",
        prepop_phone: urlParams.prepop_phone || "",
        prepop_address: urlParams.prepop_address || "",
        // UTM and tracking properties (from URL)
        utmSource: urlParams.utmSource || "",
        utmCampaign: urlParams.utmCampaign || "",
        utmMedium: urlParams.utmMedium || "",
        utmTerm: urlParams.utmTerm || "",
        utmContent: urlParams.utmContent || "",
        sessionId: urlParams.sessionId || "",
        cookee_id: urlParams.sessionId || "",
        checkoutId: urlParams.checkoutId || "",
        experiment_id: urlParams.experiment_id || "",
        // Page properties
        path: urlParams.path || "",
        referrer: urlParams.referrer || "",
        search: urlParams.search || "",
        title: urlParams.title || "",
        url: urlParams.url || ""
    };
};