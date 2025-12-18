// Convert full-width characters to half-width
export const toHalfWidth = (str: string): string => {
  return str.replace(/[\uff01-\uff5e]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 0xfee0);
  });
};

// Keep only digits
export const removeNonDigits = (str: string): string => {
  return str.replace(/\D/g, '');
};

export const normalizeString = (str: string): string => {
  return toHalfWidth(str).trim().toLowerCase();
};