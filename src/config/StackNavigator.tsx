// StackNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryScreen from '../screens/CategoryScreen';
import ServiceScreen from '../screens/ServiceScreen';
import { Category } from './types';

export type RootStackParamList = {
  CategoryScreen: undefined; // Assuming no parameters for CategoryScreen
  ServiceScreen: { 
    categoryCode: string;
    category: Category; // Add this line
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CategoryScreen"
        screenOptions={{
        headerShown: false,
        }}
        >
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;