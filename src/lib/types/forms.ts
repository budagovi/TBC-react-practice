export type ISignInFormData = {
  email: string,
  password: string,
  isRemembered: boolean
}

export type ISignUpFormData = {
  firstname: string,
  lastname: string,
  gender: string | null,
  dobMilSecs: number | null,
  city: string,
  address: string,
  mobile: string,
  email: string,
  password: string,
  confirm: string,
  agree: boolean
}

export type IContactFormData = {
  name: string,
  email: string,
  mobile: string,
  message: string
}

export type ICheckoutFormData = {
  address: string | number | readonly string[] | undefined,
  shippingMethod: string | number | readonly string[] | undefined,
  cardIsValid: boolean
}

export type IProfileEditFormData = {
  firstname: string,
  lastname: string,
  gender: string | null,
  dobMilSecs: number | null,
  mobile: string,
}

export type INewAddressForm = {
  city: string,
  address: string,
  tag: string
}