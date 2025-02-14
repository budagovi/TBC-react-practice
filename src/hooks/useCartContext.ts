'use client'
import { useContext } from "react";
import { CartContext } from "../context/cart";

/**
 * Function for using cart context in corresponding scope
 * @returns context if the function is called within CartContextProvider
 */
const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a <CartContextProvider>');
  }

  return context;
}

export default useCartContext;