// App.tsx
import React, { useEffect } from 'react';
import { View } from 'react-native';
import MainScreen from './src/components/MainScreen';
import 'react-native-gesture-handler';
import { CartProvider } from './src/config/CartContext';
import { requestInitialPermissions } from './src/config/permissions';
const App: React.FC = () => {

  useEffect(() => {
    requestInitialPermissions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CartProvider>
        <MainScreen />
      </CartProvider>
    </View>
  );
};

export default App;
