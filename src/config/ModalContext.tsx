// ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category, Service } from '../config/types'; // Adjust import paths as necessary

interface ModalContextType {
  isModalVisible: boolean;
  showModal: (service: Service | null, category: Category | null) => void;
  hideModal: () => void;
  selectedService: Service | null;
  selectedCategory: Category | null;
}

const ModalContext = createContext<ModalContextType>({
  isModalVisible: false,
  showModal: () => {},
  hideModal: () => {},
  selectedService: null,
  selectedCategory: null,
});

export const useModal = () => useContext(ModalContext);

interface ModalProviderProps {
  children: ReactNode; // Correct type definition for children
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const showModal = (service: Service | null, category: Category | null) => {
    setSelectedService(service);
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setSelectedService(null);
    setSelectedCategory(null);
  };

  return (
    <ModalContext.Provider value={{ isModalVisible, showModal, hideModal, selectedService, selectedCategory }}>
      {children}
    </ModalContext.Provider>
  );
};
