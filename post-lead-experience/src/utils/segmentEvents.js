// Simple Segment Events
import { getSegmentData } from './trackingManager';

// One function to send post_lead event
export const sendPostLeadEvent = () => {
  const segmentData = getSegmentData();
  
  const eventData = {
    appointment_type: segmentData.appointment_type || "",
    appointment_details: segmentData.appointment_details || "",
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
