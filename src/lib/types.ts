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
      message: string
    }
 * ```
 */
export interface ICustomApiResponse {
  message: string
}

export type ILoginUserActionResponse = {
  success: true;
} | {
  success: false;
  message: string;
  status: number;
}

/**
 * ```typescript
 *  {
      id: number;
      firstname: string;
      lastname: string;
      dob: string;
      gender: 'male' | 'female';
      email: string;
      mobile: string;
      address: string;
      role: 'admin' | 'user';
      created_at: string;
    }
 * ```
 */
export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  dob: string;
  gender: 'male' | 'female';
  email: string;
  mobile: string;
  address: string;
  isAdmin: boolean;
  created_at: string;
  img: string;
}

/**
 * ```typescript
 *  {
      id: number;
      name: string;
      nameGe: string;
      price: number;
      salePercentage: number;
      description: string;
      descriptionGe: string;
      lightReq: string;
      wateringNeed: string;
      growthRate: string;
      size: string;
      petFriendly: boolean;
      flowering: boolean;
      imgUrl: string;
      imageUrls: string[];
      category: string
    }
 * ```
 */
export interface IProduct {
  id: number;
  name: string;
  nameGe: string;
  price: number;
  salePercentage: number;
  description: string;
  descriptionGe: string;
  lightReq: 'partial shade' | 'full sun' | 'full shade';
  wateringNeed: 'medium' | 'low' | 'high';
  growthRate: 'moderate' | 'slow' | 'fast';
  size: 'medium' | 'large' | 'small';
  petFriendly: boolean;
  flowering: 'non-flowering' | 'seasonal flowering';
  imgUrl: string;
  imageUrls: string[];
  category: 'plant' | 'cactus' | 'bonsai';
}