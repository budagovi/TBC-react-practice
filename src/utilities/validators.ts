// *
// * Validator objects for input elements
// *

/*-=-=-=-=-=-=-=-
  
  Validator Object consists of 2 properties: validatorFn and errorMsgs:

  validateFn - Function that checks the value's validity. The value goes 
    through several checks, and if it succeeds till the end, function returs
    -1 indicating that values is valid. If it fails on a specific check, the
    function returns corresponding positive number.

  errorMsgs - Array of error messages. Messages are ordered according to 
    order of checks in validateFn, so if validator returns a positive value it 
    will be used for displaying corresponding error message to user. 
    if function returns -1 (i.e value is valid) there is no error message to be
    displayed.

  -=-=-=-=-=-=-=-*/

// -=-=-=- Validator Type -=-=-=-

export interface IValidator<T> {
  validateFn: (value: T) => number;
  errorMsgs: (locale: string) => string[];
}

// -=-=-=- Validator for reqired string values -=-=-=-

export const isRequiredFieldString = (fieldName: string): IValidator<string> => {
  return {
    validateFn: (value) => {
      if (value.trim() === '')
        return 0;
      else
        return -1;
    },
    errorMsgs: (locale = 'en') => {
      switch (locale) {
        case 'ka': return [
          fieldName + ' აუცილებელი ველია'
        ]
        default: return [
          fieldName + ' is required'
        ]
      }
    }
  }
}

// -=-=-=- Firstname & Lastname validator on registration -=-=-=-

export const nameValidatorFn = (name: string): IValidator<string> => {
  return {
    validateFn: (value) => {
      if (value.trim() === '') {
        return 0;
      } else if (value.trim().length > 15) {
        return 1;
      } else if (value.trim().includes(' ')) {
        return 2;
      } else if (!/^[a-zA-Z']+$/.test(value.trim())) {
        return 3;
      } else {
        return -1;
      }
    },
    errorMsgs: (locale = 'en') => {
      switch (locale) {
        case 'ka': return [
          name + ' აუცილებელი ველია',
          name + 'ს სიგრძე აღემატება ლიმიტს',
          name + ' არ უნდა შეიცავდეს სივრცეებს',
          name + ' უნდა შეიცავდეს მხოლოდ ასოებს და აპოსტროფს'
        ]
        default: return [
          name + ' is required',
          name + ' is too long',
          name + ' should not contain spaces',
          name + ' should contain only letters and apostrophes'
        ]
      }
    }
  }
}

// -=-=-=- DoB validator on registration -=-=-=-

export const dobValidator: IValidator<number | null> = {
  validateFn: (value) => {
    if (value === null)
      return 0;
    else
      return -1;
  },
  errorMsgs: (locale = 'en') => {
    switch (locale) {
      case 'ka': return [
        'დაბადების თარიღი აუცილებელი ველია'
      ]
      default: return [
        'Date of birth is required!'
      ]
    }
  }
}

// -=-=-=- Gender validator on registration -=-=-=-

export const genderValidator: IValidator<string | null> = {
  validateFn: (value) => {
    if (value === null)
      return 0;
    else
      return -1;
  },
  errorMsgs: (locale = 'en') => {
    switch (locale) {
      case 'ka': return [
        'სქესი აუცილებელი ველია'
      ]
      default: return [
        'Gender is required'
      ]
    }
  }
}

// -=-=-=- Mobile phone validator on registration -=-=-=-

export const mobileValidator: IValidator<string> = {
  validateFn: (value) => {
    const phoneRegex = /^\+995 5\d{2} \d{2} \d{2} \d{2}$/;
    if (value.trim() === '+995-5') {
      return 0;
    } else if (!phoneRegex.test(value.trim())) {
      return 1;
    } else {
      return -1;
    }
  },
  errorMsgs: (locale = 'en') => {
    switch (locale) {
      case 'ka': return [
        'მობილური ნომერი აუცილებელი ველია',
        'მობილური ნომერი არასრულია'
      ];
      default: return [
        'Phone number is required',
        'Incomplete phone number'
      ];
    }
  }
}

// -=-=-=- Address validator on registration -=-=-=-

export const addressValidator: IValidator<string> = {
  validateFn: (value) => {
    const specialCharsRegex = /[^a-zA-Z0-9\s.,-,']/;
    if (value.trim() === '') {
      return 0;
    } else if (value.trim().length < 5) {
      return 1;
    } else if (specialCharsRegex.test(value.trim())) {
      return 2;
    } else {
      return -1;
    }
  },
  errorMsgs: (locale = 'en') => {
    switch (locale) {
      case 'ka': return [
        'მისამართი აუცილებელი ველია',
        'მისამართი ძალიან მოკლეა',
        'მისამართი შეიცავს დაუშვებელ სიმბოლოებს'
      ];
      default: return [
        'Address is required',
        'Address is too short',
        'Address contains invalid characters'
      ];
    }
  }
}

// -=-=-=- Email validator on registration -=-=-=-

export const emailValidator: IValidator<string> = {
  validateFn: (value) => {
    if (value.trim() === '') {
      return 0;
    } else {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      return isValidEmail ? -1 : 1;
    }
  },
  errorMsgs: (locale = 'en') => {
    switch (locale) {
      case 'ka': return [
        'ელ. ფოსტა აუცილებელი ველია',
        'არასრულად შეყვანილი ელ. ფოსტა'
      ];
      default: return [
        'Email is required',
        'Invalid email address'
      ];
    }
  }
};

// -=-=-=- Password validator on registration -=-=-=-

export const passwordValidator: IValidator<string> = {
  validateFn: (value) => {
    if (value.trim() === '') {
      return 0;
    } else if (value.trim().length < 4) {
      return 1;
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(value)) {
      return 2;
    } else {
      return -1;
    }
  },
  errorMsgs: (locale = 'en') => {
    switch (locale) {
      case 'ka': return [
        'პაროლი აუცილებელი ველია',
        'პაროლი ძალიან მოკლეა',
        'პაროლი უნდა შეიცავდეს მინიმუმ ერთ დიდ ასოს, ერთ პატარა ასოს და ერთ ციფრს'
      ];
      default: return [
        'Password is required',
        'Password is too short',
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
      ];
    }
  }
};

// -=-=-=- Confirm password validator on registration -=-=-=-

export const confirmPasswordValidator = (password: string): IValidator<string> => {
  return {
    validateFn: (value) => {
      if (value.trim() === '') {
        return 0;
      } else if (value !== password) {
        return 1; 
      } else {
        return -1; 
      }
    },
    errorMsgs: (locale = 'en') => {
      switch (locale) {
        case 'ka': return [
          'პაროლის დადასტურება აუცილებელია',
          'პაროლები არ ემთხვევა'
        ];
        default: return [
          'Confirm password is required',
          'Passwords do not match'
        ];
      }
    }
  }
};

