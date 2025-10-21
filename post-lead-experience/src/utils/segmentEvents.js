// Simple Segment Events
import { getSegmentData } from './trackingManager';

// One function to send post_lead event
export const sendPostLeadEvent = () => {
  const segmentData = getSegmentData();
  
  const eventData = {
    appointment_type: segmentData.appointment_type || "",
    appointment_details: segmentData.appointment_details || "",
    button_clicked: segmentData.button_clicked || "",
    // Agent info (includes zip_code)
    agent_info: segmentData.agent_info || { agent_name: "", agent_phone: "", zip_code: "" },
    // n8n properties
    n8n_flow_triggered: segmentData.n8n_flow_triggered || "No",
    n8n_api_res: segmentData.n8n_api_res || "",
    n8n_msg_received: segmentData.n8n_msg_received || "No",
    // Quiz properties
    quiz_name: segmentData.quiz_name || "",
    quiz_email: segmentData.quiz_email || "",
    quiz_phone: segmentData.quiz_phone || "",
    quiz_address: segmentData.quiz_address || "",
     // Quiz properties
    prepop_name: segmentData.prepop_name || "",
    prepop_email: segmentData.prepop_email || "",
    prepop_phone: segmentData.prepop_phone || "",
    prepop_address: segmentData.prepop_address || "",
    // UTM and tracking properties
    utmSource: segmentData.utmSource || "",
    utmCampaign: segmentData.utmCampaign || "",
    utmMedium: segmentData.utmMedium || "",
    utmTerm: segmentData.utmTerm || "",
    utmContent: segmentData.utmContent || "",
    sessionId: segmentData.sessionId || "",
    cookee_id: segmentData.cookee_id || "",
    checkoutId: segmentData.checkoutId || "",
    experiment_id: segmentData.experiment_id || "",
    // Page properties
    path: segmentData.path || "",
    referrer: segmentData.referrer || "",
    search: segmentData.search || "",
    title: segmentData.title || "",
    url: segmentData.url || ""
  };

  // Send to Segment
  if (window.analytics) {
    window.analytics.track('post_lead', eventData);
  }
  
  return eventData;
};
