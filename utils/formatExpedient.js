export const formatExpedient = (text) => {
  const cleaned = text.replace(/\D/g, "");

  let formatted = "";

  if (cleaned.length >= 4) {
    formatted += cleaned.substring(0, 4);
  } else {
    formatted += cleaned;
    return formatted;
  }

  if (cleaned.length >= 6) {
    formatted += "-" + cleaned.substring(4, 6);
  } else if (cleaned.length > 4) {
    formatted += "-" + cleaned.substring(4);
    return formatted;
  }

  if (cleaned.length > 6) {
    formatted += "-" + cleaned.substring(6);
  }

  return formatted;
};
