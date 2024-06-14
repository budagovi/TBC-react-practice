import { ISignUpFormData } from '@/src/lib/types'
import {
  nameValidatorFn,
  dobValidator,
  genderValidator,
  mobileValidator,
  addressValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from '@/src/lib/validators'

/**
 * Checks each input field of SignUp form and detects its validity.
 * 
 * Function checks 3 separate parts of the form (as it is divided into 3 slides on display) and detecs their validity.
 * the entire form is valid, if each individual part is valid
 * @param ISignUpFormData
 * @returns object with 4 properties each representing boolean.
 */
const isSignUpFormValid = (values: ISignUpFormData) => {


  const personalDetails = (
    nameValidatorFn('firstname').validateFn(values.firstname) == -1 &&
    nameValidatorFn('lastname').validateFn(values.lastname) == -1 &&
    dobValidator.validateFn(values.dobMilSecs) == -1 &&
    genderValidator.validateFn(values.gender) == -1
  )

  const addressDetails = (
    mobileValidator.validateFn(values.mobile) == -1 &&
    addressValidator.validateFn(values.address) == -1
  )

  const credentials = (
    emailValidator.validateFn(values.email) == -1 &&
    passwordValidator.validateFn(values.password) == -1 &&
    confirmPasswordValidator(values.password).validateFn(values.confirm) == -1 &&
    values.agree === true
  )

  return {
    addressDetails,
    personalDetails,
    credentials,
    entire: addressDetails && personalDetails && credentials
  }
}

export default isSignUpFormValid;