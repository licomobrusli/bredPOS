// App.tsx
import React from 'react';
import MainScreen from './src/components/MainScreen';
import AppNavigator from './src/config/StackNavigator'; // Make sure this path is correct
import 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    <MainScreen MainContent={<AppNavigator />} />
  );
};

export default App;
