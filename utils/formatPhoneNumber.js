export function formatPhoneNumber(text) {
  const cleaned = ("" + text).replace(/\D/g, "");

  let formatted = "";
  if (cleaned.length <= 3) {
    formatted = cleaned;
  } else if (cleaned.length <= 6) {
    formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else if (cleaned.length <= 8) {
    formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  } else {
    formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      8
    )}-${cleaned.slice(8, 10)}`;
  }

  return formatted;
}
