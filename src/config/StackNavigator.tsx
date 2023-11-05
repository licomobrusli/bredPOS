// StackNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryList from '../content/CategoryList';
import ServiceList from '../content/ServiceList';

// If you are using TypeScript, you can define the types for your navigation parameters
export type RootStackParamList = {
  CategoryList: undefined;
  ServiceList: { categoryCode: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ServiceList"
        screenOptions={{
        headerShown: false, // This will apply to all screens within this navigator
        }}
        >
        <Stack.Screen name="CategoryList" component={CategoryList} />
        <Stack.Screen name="ServiceList" component={ServiceList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
