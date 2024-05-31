export default interface Product {
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