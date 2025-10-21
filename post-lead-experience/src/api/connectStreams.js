// src/api/connectStreams.js
import { trackN8nApiResponse } from '../utils/trackingManager';
import { sendPostLeadEvent } from '../utils/segmentEvents';

export async function initConnectStreamsSession({
  phoneNumber,
  pageUrl,
  userUuid,
  moduleId = "1929",
  containerId = "L6VC",
}) {
  const payload = {
    route: "init",
    version: "cs-3.4.5",
    moduleid: moduleId,
    containerid: containerId,
    conversionid: "",
    ismobile: /Mobi|Android/i.test(navigator.userAgent).toString(),
    phonenumber: phoneNumber,
    lastsession: "false",
    destination: "",
    destinationext: "",
    useruuid: userUuid,
    pageurl: pageUrl,
    calloninit: false,
    dyn: "{}",
  };
  
  const res = await fetch("https://api.connectstreams.com/service/v1/router", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) {
    throw new Error(`Connect Streams API error: ${res.status}`);
  }
  
  return res.json();
}

export async function sendResendMessageAPI(apiPayload) {
  try {
    console.log('Sending message with payload:', apiPayload);

    const response = await fetch('https://alyson123.app.n8n.cloud/webhook-test/e04b7f3b-e1aa-4389-b386-4572c9e3a13f', {
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
      
      // Send post_lead event with all updated tracking data
      sendPostLeadEvent();
      
      return { success: true, data: responseText };
    } else {
      const errorText = await response.text();
      console.error('API call failed:', response.status);
      // Track error response
      trackN8nApiResponse(`Error ${response.status}: ${errorText}`);
      
      // Send post_lead event even if there's an error
      sendPostLeadEvent();
      
      return { success: false, error: `Error ${response.status}: ${errorText}` };
    }
  } catch (error) {
    console.error('Error calling API:', error);
    // Track error
    trackN8nApiResponse(`Error: ${error.message}`);
    
    // Send post_lead event even if there's an error
    sendPostLeadEvent();
    
    return { success: false, error: error.message };
  }
}

