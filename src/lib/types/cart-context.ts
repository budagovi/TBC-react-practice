export type ICartContext = {
  items: ICartItem[],
  totalAmount: number,
  addItem: (item: ICartItem) => void,
  removeItem: (id: number) => void,
  clearCart: () => void,
  clearItem: (id: number) => void
}

export type ICartState = {
  totalAmount: number;
  items: ICartItem[];
}

export type ICartAction = {
  type: 'ADD_ITEM',
  payload: ICartItem
} | {
  type: 'REMOVE_ITEM',
  payload: number
} | {
  type: 'SET_CART',
  payload: ICartState
} | {
  type: 'CLEAR_CART',
  payload: null
} | {
  type: 'CLEAR_ITEM',
  payload: number
}

export type ICartItem = {
  id: number,
  name: string,
  nameGe: string,
  price: number,
  salePercentage: number,
  imgUrl: string,
  qty: number,
}