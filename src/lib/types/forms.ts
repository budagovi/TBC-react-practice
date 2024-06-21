/**
 * ```typescript
 *  {
      email: string,
      password: string,
      isRemembered: boolean
    }
 * ```
 */
export interface ISignInFormData {
  email: string,
  password: string,
  isRemembered: boolean
}

/**
 * ```typescript
 *  {
      firstname: string,
      lastname: string,
      gender: string | null,
      dobMilSecs: number | null,
      address: string,
      mobile: string,
      email: string,
      password: string,
      confirm: string,
      agree: boolean
 *  }
 * ```
 */
export interface ISignUpFormData {
  firstname: string,
  lastname: string,
  gender: string | null,
  dobMilSecs: number | null,
  address: string,
  mobile: string,
  email: string,
  password: string,
  confirm: string,
  agree: boolean
}

/**
 * ```typescript
 *  {
      name: string,
      email: string,
      phone: string,
      message: string
 *  }
 * ```
 */
export interface IContactFormData {
  name: string,
  email: string,
  mobile: string,
  message: string
}
