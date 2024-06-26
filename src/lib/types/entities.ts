import { ICartItem } from "./cart-context";

export type IUser = {
  id: number,
  firstname: string,
  lastname: string,
  dob: string,
  gender: 'male' | 'female',
  email: string,
  mobile: string,
  isAdmin: boolean,
  image: string | null
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

export type IAddress = {
  id: number,
  userId: number,
  address: string,
  city: string,
  tag: string,
  mobile: string
}

export type ICreditCard = {
  cardId: string,
  expires: string,
}

export type IOrder = {
  id: number,
  userId: number;
  totalAmount: number;
  totalPrice: number;
  items: ICartItem[];
  created: string;
}