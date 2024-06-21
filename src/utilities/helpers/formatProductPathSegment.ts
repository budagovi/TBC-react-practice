/**
 * Formats the pathname for product page using product's id and name.
 * replaces any white spaces with '-'
 * 
 * @param {string} name 
 * @param {number} id
 * @returns formatted pathanme
 */
const formatProductPathSegment = (name: string, id: number) => {

  // X -> 00X
  const formattedID = id.toString().padStart(3, '0');

  const formattedName = name.replace(' ', '-');

  return `${formattedName}-${formattedID}`;
};

export default formatProductPathSegment;