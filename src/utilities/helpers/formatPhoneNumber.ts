// *
// * Helper function to format the phone number on registration
// *

const formatPhoneNumber = (value: string) => {
  const prefix = "+995 5";

  // Remove all non-digit characters except the prefix
  const phoneNumber = value.replace(/[^\d]/g, "").slice(4);

  const len = phoneNumber.length;

  //desired pattern: "+995 5XX XX XX XX"
  if (len <= 2) {
    return `${prefix}${phoneNumber}`;
  } else if (len <= 4) {
    return `${prefix}${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2)}`;
  } else if (len <= 6) {
    return `${prefix}${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 4)} ${phoneNumber.slice(4)}`;
  } else {
    return `${prefix}${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 4)} ${phoneNumber.slice(4, 6)} ${phoneNumber.slice(6, 8)}`;
  }
};

export default formatPhoneNumber;