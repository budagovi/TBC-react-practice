export interface ICartContext {
  items: ICartItem[],
  totalAmount: number,
  addItem: (item: ICartItem) => void,
  removeItem: (id: number) => void,
  clearCart: () => void
}

export interface ICartState {
  totalAmount: number;
  items: ICartItem[];
}

export interface ICartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'SET_CART' | 'RESET_CART',
  payload: ICartItem | number | ICartState | null 
}

export interface ICartItem {
  id: number,
  title: string,
  price: number,
  discountPercentage: number,
  category: string,
  amount: number
}