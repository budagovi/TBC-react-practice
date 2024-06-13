'use client'
import { ReactNode, useReducer, useEffect, createContext, useState } from "react"
import { ICartItem, ICartState, ICartAction, ICartContext } from "../interfaces/cart-context"
import isICartItem from "../utilities/isICartItem";
import isICartState from "../utilities/isICartState";
//import useLocalStorage from "../hooks/useLocalStorage";
//import { CART_LOCSTORE_KEY } from "../constants";

export const CartContext = createContext<ICartContext>({} as ICartContext);

const initialValue = {
  totalAmount: 0,
  items: []
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= PUT REQUEST

const putData = async (id: number, state: ICartState) => {

  const response = await fetch('/api/cart/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(state)
  })

  console.log('PUT request status : ' + response.status)
  if (response.ok) {
    console.log('data updated successfully')
  }
  else if (response.status === 404) {
    postData(id, state) // create cart record for user 
  }
  else {
    console.log('something went wrong, couldnt fetch data')
  }
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= POST REQUEST

const postData = async (id: number, state: ICartState) => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...state, id: id })
  })

  if (response.ok) {
    console.log('cart created successfully')
  }
}

const cartReducer = (state: ICartState, action: ICartAction): ICartState => {

  // set initial values
  const { items, totalAmount } = state;
  const { payload } = action;

  let updatedItems = [...items];

  if (action.type === 'ADD_ITEM' && isICartItem(payload)) {

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
  else if (action.type === 'REMOVE_ITEM' && typeof payload === 'number') {

    const id = payload
    const idx = state.items.findIndex(item => item.id === id);

    // if the amount of selected item is 1, we remove it from the list
    if (state.items[idx].amount === 1) {
      updatedItems = [...state.items.filter(item => item.id !== id)]
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
  else if (action.type === 'SET_CART' && isICartState(payload)) {
    return payload
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

  //const [storedItems, setStoredItems] = useLocalStorage<ICartState>(CART_LOCSTORE_KEY, initialValue)
  const [initialized, setInitialized] = useState(false)
  const [state, dispatch] = useReducer(cartReducer, initialValue);

  const id = 2;

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch('/api/cart/' + id)
  //     console.log('get req')
  //     if (response.ok) {
  //       const records = await response.json();
  //       const cartState = records.data[0]

  //       //console.log(cartState && cartState.totalamount)
  //       if (cartState && cartState.data)
  //         dispatch({ type: 'SET_CART', payload: { items: cartState.data, totalAmount: +cartState.totalamount as number } })
  //     }
  //   }

  //   getData()
  // }, [])

  useEffect(() => {
    //setStoredItems(state);
    if (initialized) {
      putData(id, state)
    }
    setInitialized(true)

  }, [state]);


  const addItemHandler = (item: ICartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItemHandler = (item: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item })
  }

  const resetCartHandler = () => {
    dispatch({ type: 'RESET_CART', payload: null })
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