'use client'
// --- react api
import { ReactNode, useReducer, useEffect, createContext, useState } from "react"
// --- hooks
import useLocalStorage from "../hooks/useLocalStorage";
// --- constants
import { CART_LOCSTORE_KEY } from "../lib/constants";
// --- types
import type { ICartAction, ICartContext, ICartItem, ICartState } from "../lib/types/cart-context";
import type { IActionResponse } from "../lib/types/responses";
// --- server actions
import getActiveUser from "@/src/server actions/getActiveUser";
import getDatabaseCart from "../server actions/getDatabaseCart";
import setDatabaseCart from "../server actions/setDatabaseCart";

// create context
export const CartContext = createContext<ICartContext>({} as ICartContext);

const initialValue = {
  totalAmount: 0,
  items: []
}

const cartReducer = (state: ICartState, action: ICartAction): ICartState => {

  // set initial values
  const { items, totalAmount } = state;
  const { type, payload } = action;

  let updatedItems = [...items];

  if (type === 'ADD_ITEM') {

    const idx = state.items.findIndex(item => item.id === payload.id);

    // if product exists we just increase amount
    if (idx >= 0) {
      updatedItems[idx] = {
        ...state.items[idx],
        qty: state.items[idx].qty + payload.qty
      }
    }
    // if product does not exist we push it into cart list
    else {

      updatedItems = updatedItems.concat(payload)
    }

    return {
      items: updatedItems,
      totalAmount: totalAmount + payload.qty
    }
  }
  else if (type === 'REMOVE_ITEM') {

    const id = payload
    const idx = state.items.findIndex(item => item.id === id);

    // if the amount of selected item is 1, we remove it from the list
    if (state.items[idx].qty === 1) {
      updatedItems = [...state.items.filter(item => item.id !== id)]
    }
    // if amount is more than 1, we just decrease it by one
    else {
      updatedItems[idx] = {
        ...state.items[idx],
        qty: state.items[idx].qty - 1
      }
    }

    return {
      items: updatedItems,
      totalAmount: totalAmount - 1
    }
  }
  else if (type === 'CLEAR_ITEM') {
    const id = payload
    const idx = state.items.findIndex(item => item.id === id);
    const difference = state.items[idx].qty;
    updatedItems = state.items.filter(item => item.id !== payload)

    return {
      items: updatedItems,
      totalAmount: totalAmount - difference
    }
  }
  else if (type === 'SET_CART') {
    return payload
  }
  else if (type === 'CLEAR_CART') {
    return initialValue
  }

  return initialValue;
}

interface IProps {
  children: ReactNode
}

const CartContextProvider = ({ children }: IProps) => {

  const [storedItems, setStoredItems] = useLocalStorage<ICartState>(CART_LOCSTORE_KEY, initialValue)
  const [state, dispatch] = useReducer(cartReducer, storedItems);
  const [user, setUser] = useState<any | null>(null);

  // detect if user is authorized (override localstorage cart if needed)
  useEffect(() => {
    const getSession = async () => {
      const user = await getActiveUser();
      if (!!user) {
        const dbCartState: IActionResponse = await getDatabaseCart(user.id)

        if (dbCartState.success && dbCartState.payload.data.totalAmount > 0)
          dispatch({ type: 'SET_CART', payload: dbCartState.payload.data })
      }
      setUser(user)
    }
    getSession();
  }, [])

  // update localstorage (and database if needed)
  useEffect(() => {
    setStoredItems(state)
    if (user) {
      setDatabaseCart(state, user.id)
    }
  }, [state, user])

  const addItemHandler = (item: ICartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItemHandler = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const resetCartHandler = () => {
    dispatch({ type: 'CLEAR_CART', payload: null })
  }

  const clearItemHandler = (id: number) => {
    dispatch({ type: 'CLEAR_ITEM', payload: id })
  }

  const value = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: resetCartHandler,
    clearItem: clearItemHandler
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )

}

export default CartContextProvider;