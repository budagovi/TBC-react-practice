import { IContactFormData } from '@/src/lib/types'
import {
  isRequiredFieldString,
  mobileValidator,
  emailValidator
} from '@/src/lib/validators'

/**
 * Checks each input field of Contact form and detects its validity.
 * 
 * @param IContactFormData
 * @returns boolean
 */
const isContactFormValid = (values: IContactFormData) => {

  return (
    emailValidator.validateFn(values.email) == -1 &&
    isRequiredFieldString('').validateFn(values.name) == -1 &&
    isRequiredFieldString('').validateFn(values.message) == -1 &&
    mobileValidator.validateFn(values.mobile)
  )
}

export default isContactFormValid;