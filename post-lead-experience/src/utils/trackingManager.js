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
    button_clicked: "", // Track which button was clicked
    agent_info: {
        agent_name: "",
        agent_phone: "",
        zip_code: ""
    },
    n8n_flow_triggered: "No",
    n8n_api_res: "",
    n8n_msg_received: "No"
};

// Set consultation type
export const trackConsultationSelection = (type) => {
    trackingData.appointment_type = type;
};

// Set appointment details
export const trackAppointmentDetails = (details) => {
    trackingData.appointment_details = details;
};

// Track button click
export const trackButtonClick = (buttonType) => {
    trackingData.button_clicked = buttonType;
};

// Set agent info
export const trackAgentInfo = (agentName, agentPhone, zipCode) => {
    trackingData.agent_info = {
        agent_name: agentName || "",
        agent_phone: agentPhone || "",
        zip_code: zipCode || ""
    };
};

// Set n8n flow triggered status
export const trackN8nFlowTriggered = (status) => {
    trackingData.n8n_flow_triggered = status; // "Yes" or "No"
};

// Set n8n API response
export const trackN8nApiResponse = (response) => {
    trackingData.n8n_api_res = response;
};

// Set n8n message received status
export const trackN8nMsgReceived = (status) => {
    trackingData.n8n_msg_received = status; // "Yes" or "No"
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
        button_clicked: trackingData.button_clicked || "", // Track button clicks
        // Agent info (includes zip_code)
        agent_info: trackingData.agent_info,
        // n8n properties
        n8n_flow_triggered: trackingData.n8n_flow_triggered,
        n8n_api_res: trackingData.n8n_api_res,
        n8n_msg_received: trackingData.n8n_msg_received,
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