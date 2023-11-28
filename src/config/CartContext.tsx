// CartContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { Category, Service } from '../config/types';

interface CartItem {
    selectedCategory: Category | null;
    selectedService: Service | null;
    selectedColors: string[];
    modalCountsDetails: any[]; // Define a more specific type if possible
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {}
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
    children: React.ReactNode;  // Define type for children
  }  

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems([...cartItems, item]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
