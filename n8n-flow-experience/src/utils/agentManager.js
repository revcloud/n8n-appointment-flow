const AGENT_DATA = {
  robertH: {
    name: "Robert Hryniewich",
    fullName: "Robert Hryniewich",
    phone: "303-564-8900",
    image: "https://palisade-api-connectors.s3.us-west-2.amazonaws.com/appointment/c6371dab0134e5b839352e711a5a560da-e1720516500rd-w260_h260.jpg",
    zipCodes: [
      "80013", "80014", "80015", "80016", "80017", "80018", "80134", "80138",
      "80108", "80249", "80022", "80125", "80124", "80130", "80126", "80012",
      "80121", "80122"
    ],
    description: [
      "Robert will visit your home to take photos and collect details so you can receive your cash offer within 24 hours of his visit.",
      "With over 20 years of experience and hundreds of successful home sales, Robert makes the process simple, transparent, and stress-free."
    ]
  },
  noeCruz: {
    name: "Noe Cruz",
    fullName: "Noe Cruz",
    phone: "559-916-8617",
    image: "https://palisade-api-connectors.s3.us-west-2.amazonaws.com/appointment/ab44f1d116e6d0741a721e2367b562cd-h_l.jpg",
    zipCodes: [
      "93611", "93650", "93701", "93702", "93703", "93704", "93705", "93706",
      "93707", "93708", "93709", "93710", "93711", "93712", "93714", "93715",
      "93716", "93717", "93718", "93720", "93721", "93722", "93723", "93724",
      "93725", "93726", "93727", "93728", "93729", "93730", "93737", "93740",
      "93741", "93744", "93747", "93750", "93755", "93760", "93761", "93764",
      "93765", "93771", "93772", "93773", "93774", "93775", "93776", "93777",
      "93778", "93779", "93786", "93790", "93791", "93792", "93793", "93794",
      "93844", "93888"
    ],
    description: [
      "Noe will visit your home to take photos and collect details so you can receive your cash offer within 24 hours of his visit.",
      "With over 20 years of experience and hundreds of successful home sales, Noe makes the process simple, transparent, and stress-free."
    ]
  },
  santiagoSalcido: {
    name: "Santiago Salcido",
    fullName: "Santiago Salcido",
    phone: "209-568-7391",
    image: "https://palisade-api-connectors.s3.us-west-2.amazonaws.com/appointment/aHR0cHM6Ly9pLmMyMS5jb20vMTEwM2kwL3A1dng4NHhoZDR5NTRyeTZyMGZzZGhieGQwaQ.jpg",
    zipCodes: [
      "95336", "95337", "95461", "95376", "95377", "95330", "95350", "95356",
      "95355", "95368", "95351", "95357", "95358", "95367", "95307", "95366"
    ],
    description: [
      "Santiago will visit your home to take photos and collect details so you can receive your cash offer within 24 hours of his visit.",
      "With over 20 years of experience and hundreds of successful home sales, Santiago makes the process simple, transparent, and stress-free."
    ]
  }
};

export const getAgentByZipCode = (zipCode) => {
  if (!zipCode) {
    return null;
  }

  for (const [agentKey, agentData] of Object.entries(AGENT_DATA)) {
    if (agentData.zipCodes.includes(zipCode)) {
      return agentData;
    }
  }

  return null;
};

export const getCurrentAgent = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const quizAddress = urlParams.get('quiz_address');
  if (quizAddress) {
    const extractedZip = extractZipFromAddress(quizAddress);
    if (extractedZip) {
      return getAgentByZipCode(extractedZip);
    }
  }

  const prepopAddress = urlParams.get('prepop_address');
  if (prepopAddress) {
    const extractedZip = extractZipFromAddress(prepopAddress);
    if (extractedZip) {
      return getAgentByZipCode(extractedZip);
    }
  }

  return null;
};


export const saveZipCode = (zipCode) => {
  if (zipCode) {
    localStorage.setItem('userZipCode', zipCode);
  }
};

export const extractZipFromAddress = (encodedAddress) => {
  if (!encodedAddress || typeof encodedAddress !== 'string') {
    return null;
  }

  try {
    const decodedAddress = decodeURIComponent(encodedAddress);
    const addressWithSpaces = decodedAddress.replace(/\+/g, ' ');
    const zipMatch = addressWithSpaces.match(/\b\d{5}\b/);
    
    return zipMatch ? zipMatch[0] : null;
  } catch (error) {
    return null;
  }
};

export default {
  getAgentByZipCode,
  getCurrentAgent,
  saveZipCode,
  extractZipFromAddress,
  AGENT_DATA
};
