// StackNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryScreen from '../screens/CategoryScreen';
import ServiceScreen from '../screens/ServiceScreen';

// If you are using TypeScript, you can define the types for your navigation parameters
export type RootStackParamList = {
  CategoryScreen: undefined;
  ServiceScreen: { categoryCode: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CategoryScreen"
        screenOptions={{
        headerShown: false, // This will apply to all screens within this navigator
        }}
        >
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;