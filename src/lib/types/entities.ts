export type IUser = {
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

export type IProduct = {
  id: number;
  name: string;
  nameGe: string;
  price: number;
  salePercentage: number;
  description: string;
  descriptionGe: string;
  growthRate: 'slow' | 'fast';
  size: 'medium' | 'large' | 'small';
  flowering: 'non-flowering' | 'seasonal flowering';
  imgUrl: string;
  category: 'plant' | 'cactus' | 'bonsai';
}