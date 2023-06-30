export const isFieldEmpty = (text: string) => {
  if (text && text.length > 0) return false;
  else return true;
};

export const length8Char = (text: string) => text.length >= 8;

export const hasNumber = (text: string) => /\d/.test(text);
export const hasUpperCase = (text: string) =>
  text.match(/[A-Z]/g) === null ? false : true;
export const hasLowerCase = (text: string) =>
  text.match(/[a-z]/g) === null ? false : true;
export const hasSpeialCase = (text: string) => {
  const specialChars = "@_/%&!";
  for (let i = 0; i < specialChars.length; i++) {
    if (text.indexOf(specialChars[i]) > -1) {
      return true;
    }
  }
  return false;
};

export const hasContainOnlySpaces = (text: string) =>
  text.replace(/\s/g, "").length;

export const getOTPfromMessage = (message: string) => {
  if (message) {
    const match = message.match(/\b\d{4}\b/);
    return match ? match[0] : "";
  } else {
    return "";
  }
};
