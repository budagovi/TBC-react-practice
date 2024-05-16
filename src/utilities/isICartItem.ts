// *
// * Utility that checks if object is type of ICartItem
// *

// --- interfaces
import { ICartItem } from "../interfaces/cart-context";

const isICartItem = (obj: any): obj is ICartItem => {
  return (
    typeof obj === 'object'
    && 'id' in obj
    && 'title' in obj
    && 'price' in obj
    && 'discountPercentage' in obj
    && 'category' in obj
    && 'amount' in obj
  );
}

export default isICartItem;