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
