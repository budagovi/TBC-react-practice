/**
 * Replaces all the characters in string with *. Mostly used for hiding passwords
 * 
 * @param string 
 * @returns the string of *s
 */
export const maskString = (str: string) => {
  return str.replace(/./g, '*');
}

/**
 * Function to mask the first 5 characters of a string with asterisks.
 * @param str The input string to mask.
 * @returns The masked string with the first 5 characters replaced by '*'.
 */
export const maskHalfString = (str: string): string => {
  if (str.length < 5) {
    return maskString(str);
  }

  const maskedChars = '*'.repeat(5);
  const remainingChars = str.substring(5);

  return maskedChars + remainingChars;
};