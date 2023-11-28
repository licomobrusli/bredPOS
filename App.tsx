// App.tsx
import React from 'react';
import MainScreen from './src/components/MainScreen';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { CartProvider } from './src/config/CartContext';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <CartProvider>
        <MainScreen />
      </CartProvider>
    </View>
  );
};

export default App;
