'use client'
import { ReactNode, useReducer, useEffect, createContext } from "react"
import { ICartItem, ICartState, ICartAction, ICartContext } from "../interfaces/cart-context"
import useLocalStorage from "../hooks/useLocalStorage";
import { CART_LOCSTORE_KEY } from "../constants";

export const CartContext = createContext<ICartContext>({} as ICartContext);

const initialValue = {
  totalAmount: 0,
  items: []
}

const cartReducer = (state: ICartState, action: ICartAction): ICartState => {

  // set initial values
  const { items, totalAmount } = state;
  const { payload } = action;

  let updatedItems = [...items];

  if (action.type === 'ADD_ITEM' && payload ) {

    const idx = state.items.findIndex(item => item.id === payload.id);

    // if product exists we just increase amount
    if (idx >= 0) {
      updatedItems[idx] = {
        ...state.items[idx],
        amount: state.items[idx].amount + payload.amount
      }
    }
    // if product does not exist we push it into cart list
    else {
      updatedItems = updatedItems.concat(payload)
    }

    return {
      items: updatedItems,
      totalAmount: totalAmount + payload.amount
    }
  }
  else if (action.type === 'REMOVE_ITEM' && payload) {

    const idx = state.items.findIndex(item => item.id === payload.id);
    
    // if the amount of selected item is 1, we remove it from the list
    if (state.items[idx].amount === 1) {
      console.log('test')
      updatedItems = [...state.items.filter(item => item.id !== payload.id)]
    }
    // if amount is more than 1, we just decrease it by one
    else {
      updatedItems[idx] = {
        ...state.items[idx],
        amount: state.items[idx].amount - 1
      }
    }

    return {
      items: updatedItems,
      totalAmount: totalAmount - 1
    }
  }
  else if (action.type === 'RESET_CART') {
    return initialValue
  }

  return initialValue;
}

interface IProps {
  children: ReactNode
}

const CartContextProvider = ({ children }: IProps) => {

  const [storedItems, setStoredItems] = useLocalStorage<ICartState>(CART_LOCSTORE_KEY, initialValue)
  const [state, dispatch] = useReducer(cartReducer, storedItems || initialValue);

  useEffect(() => {
    setStoredItems(state);
  }, [state]);

  const addItemHandler = (item: ICartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItemHandler = (item: ICartItem) => {
    dispatch({type: 'REMOVE_ITEM', payload: item})
  }

  const resetCartHandler = () => {
    dispatch({type: 'RESET_CART', payload: null})
  }

  const value: ICartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: resetCartHandler
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider;