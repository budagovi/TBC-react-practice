// *
// * Utility that checks if object is type of ICartState
// *

// --- interfaces
import { ICartState } from "../interfaces/cart-context";

const isICartState = (obj: any): obj is ICartState => {
  return (
    typeof obj === 'object'
    && 'totalAmount' in obj
    && 'items' in obj
  );
}

export default isICartState;
