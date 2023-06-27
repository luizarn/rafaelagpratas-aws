import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();
export default CartContext;

// eslint-disable-next-line react/prop-types
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useLocalStorage('userCart', {});

  return (
    <CartContext.Provider value={{ cartCount, setCartCount}}>
      {children}
    </CartContext.Provider>
  );
}