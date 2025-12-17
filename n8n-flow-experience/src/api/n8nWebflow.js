import toast from 'react-hot-toast';


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



