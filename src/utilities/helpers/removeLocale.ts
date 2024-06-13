/**
 * Removes locale segment from the pathname
 * 
 * @param {string} path 
 * @returns the same path, but without locale segment
 */

const removeLocale = (path: string): string => {
  return '/' + path.split('/').slice(2).join('/');
}

export default removeLocale;