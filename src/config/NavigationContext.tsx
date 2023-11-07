import React, { createContext, useState, ReactNode } from 'react';

// Define the interface for the context state
interface NavigationContextState {
  currentScreen: string;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}

// Define the default state
const defaultState: NavigationContextState = {
  currentScreen: 'CategoryScreen',
  setCurrentScreen: () => {}, // Placeholder function
};

// Create the context with the default state
export const NavigationContext = createContext<NavigationContextState>(defaultState);

// Define the interface for the props of NavigationProvider
interface NavigationProviderProps {
  children: ReactNode;
}

// Define the NavigationProvider component
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<string>('CategoryScreen');

  return (
    <NavigationContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </NavigationContext.Provider>
  );
};
