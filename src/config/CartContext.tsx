// CartContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { Category, Service } from '../config/types';

export interface CartItem {
    selectedCategory: Category | null;
    selectedService: Service | null;
    selectedColors: string[];
    counterValue: number;
    modalCountsDetails: any[];
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    updateCartItem: (item: CartItem) => void;
    setCartItems: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  updateCartItem: () => {},
    setCartItems: () => {},
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
    children: React.ReactNode;  // Define type for children
  }  

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItemsState] = useState<CartItem[]>([]);
    const setCartItems = (items: CartItem[]) => {
        setCartItemsState(items);
    };

    const addToCart = (item: CartItem) => {
        setCartItems([...cartItems, item]);
    };

    const updateCartItem = (updatedItem: CartItem) => {
        // Find the index of the item to be updated
        const itemIndex = cartItems.findIndex(item =>
            item.selectedService?.id === updatedItem.selectedService?.id &&
            item.selectedCategory?.id === updatedItem.selectedCategory?.id
        );

        if (itemIndex !== -1) {
            // Update the item at the found index
            const updatedCartItems = [...cartItems];
            updatedCartItems[itemIndex] = updatedItem;
            setCartItems(updatedCartItems);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCartItem, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};
