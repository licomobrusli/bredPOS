// App.tsx
import React from 'react';
import MainScreen from './src/components/MainScreen';
import 'react-native-gesture-handler';
import { StatusBar, View } from 'react-native';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
    {/*<StatusBar translucent backgroundColor="transparent" />*/}
    <MainScreen />
    </View>
  );
};

export default App;
