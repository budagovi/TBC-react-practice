const isDigit = (c: string) => {
  return !isNaN(parseInt(c));
}

const isLetter = (c: string) => {
  return ((c >= 'a' && c <= 'z'));
}

/**
 * Uses DFA schema with 7 nodes to loop over email string characters and check whether they 
 * correspond to email address format or not.
 * 
 * @param {string} email 
 * @returns 7 if the address is valid, in other case -1, 1, 2, 3, 4, 5, 6
 */
const isEmailFormat = (email: string) => {
  let currentState: number = 1;

  const validator = (state: number, char: string) => {

    //DFA schema
    switch (state) {
      case 1:
        if (isLetter(char) || isDigit(char))
          return 2;
        else return -1;
      case 2:
        if (char === '.' || char === '_' || char === '-')
          return 1;
        else if (isLetter(char) || isDigit(char))
          return 2;
        else if (char === '@')
          return 3;
        else return -1;
      case 3:
        if (char === '.' || char === '_' || char === '-')
          return -1
        else
          return 4;
      case 4:
        if (isDigit(char) || isLetter(char))
          return 4;
        else if (char === '-')
          return 3;
        else if (char === '.')
          return 5;
        else return -1;
      case 5:
        if (isDigit(char) || char === '-')
          return 4;
        else if (isLetter(char))
          return 6;
        else return -1;
      case 6:
        if (isLetter(char))
          return 7;
        else if (isDigit(char) || char === '-')
          return 4;
        else if (char === '.')
          return 5;
        else return -1;
      case 7:
        if (isLetter(char))
          return 7;
        else if (isDigit(char) || char === '-')
          return 4;
        else if (char === '.')
          return 5;
        else return -1;
      default:
        return -1
    }
  }

  for (let i = 0; i < email.length; ++i) {
    if (currentState !== -1)
      currentState = validator(currentState, email[i]);
  }

  //let errorMsg = '';

  // if (currentState === 1)
  //   errorMsg = 'REJECTED! email username should not ent with special character';
  // else if (currentState === 2)
  //   errorMsg = 'REJECTED! missing the "@"';
  // else if (currentState === 3)
  //   errorMsg = 'REJECTED! missing domain part';
  // else if (currentState === 4)
  //   errorMsg = 'REJECTED! invalid domain part';
  // else if (currentState === 5)
  //   errorMsg = 'REJECTED! domain sufix cant end with period';
  // else if (currentState === 6)
  //   errorMsg = 'REJECTED! domain sufix should be at least 2 characters';
  // else if (currentState === 7)
  //   errorMsg = 'ACCEPTED';
  // else if (currentState === -1)
  //   errorMsg = 'REJECTED! invalid email address';

  return currentState;
}

export default isEmailFormat;