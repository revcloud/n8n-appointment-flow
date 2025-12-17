import toast from 'react-hot-toast';

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
    const response = await fetch(
      'https://alyson123.app.n8n.cloud/webhook/e04b7f3b-e1aa-4389-b386-4572c9e3a13f',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      }
    );

    const responseText = await response.text();

    if (response.ok) {
      toast.success('Message has been sent successfully!');
      return { success: true, data: responseText };
    } else {
      toast.error('Failed to send message. Please try again.');
      return { success: false, error: `Error ${response.status}: ${responseText}` };
    }
  } catch (error) {
    toast.error('Failed to send message. Please try again.');
    return { success: false, error: error.message };
  }
}



