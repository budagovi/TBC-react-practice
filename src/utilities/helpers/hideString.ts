/**
 * Replaces all the characters in string with *. Mostly used for hiding passwords
 * 
 * @param string 
 * @returns the string of *s
 */
export const maskString = (str: string) => {
  return str.replace(/./g, '*');
}