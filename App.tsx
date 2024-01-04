import React, { useEffect } from 'react';
import { View } from 'react-native';
import MainScreen from './src/components/MainScreen';
import 'react-native-gesture-handler';
import { CartProvider } from './src/config/CartContext';
import { requestInitialPermissions } from './src/config/permissions';
import ImmersiveMode from 'react-native-immersive-mode';
import SwatchColorsProvider from './src/config/swatchColorsProvider'; // Import the SwatchColorsProvider

const App: React.FC = () => {

  useEffect(() => {
    requestInitialPermissions();
    ImmersiveMode.fullLayout(true);
    ImmersiveMode.setBarMode('FullSticky');
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SwatchColorsProvider>
        <CartProvider>
          <MainScreen />
        </CartProvider>
      </SwatchColorsProvider>
    </View>
  );
};

export default App;
