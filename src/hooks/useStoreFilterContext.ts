'use client'
import { useContext } from "react";
import { StoreFilterContext } from "../context/store-filter";

/**
 * Function for using store filter context in corresponding scope
 * @returns context if the function is called within StoreFilterContexttProvider
 */
const useStoreFilterContext = () => {
  const context = useContext(StoreFilterContext);

  if (!context) {
    throw new Error('useCart must be used within a <StoreFilterContexttProvider>');
  }

  return context;
}

export default useStoreFilterContext;